const express = require('express');
const router = express.Router();
const User = require('./User');  // Import User model
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');


// Set image upload path and restrictions
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');  // Store in images folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file format. Only JPEG, PNG, and GIF are allowed.'));
        }
        cb(null, true);
    }
});

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a user
 *     description: Create a new user with a role type of either "admin" or "employee" and validate email, full name, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: User's full name, only alphabetic characters are allowed
 *               email:
 *                 type: string
 *                 description: User's email, must end with `@northeastern.edu`
 *               password:
 *                 type: string
 *                 description: User's password, must include at least 8 characters, including uppercase, lowercase, numbers, and special characters
 *               type:
 *                 type: string
 *                 enum: [admin, employee]
 *                 description: User's role type, must be either "admin" or "employee"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *       400:
 *         description: Invalid request format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email format"
 *       500:
 *         description: Server error
 */

router.post('/create', async (req, res) => {
    try {
        const { fullName, email, password, type } = req.body;

        // Validate type
        if (!['admin', 'employee'].includes(type)) {
            return res.status(400).json({ error: 'Type must be either "admin" or "employee"' });
        }

        // Email validation
        if (!/^[a-zA-Z0-9._%+-]+@northeastern\.edu$/.test(email)) {
            return res.status(400).json({ error: 'Email must end with @northeastern.edu' });
        }

        // Validate fullName format
        if (!/^[A-Za-z]+$/.test(fullName)) {
            return res.status(400).json({ error: 'Full name can only contain letters, no spaces or special characters' });
        }

        // Password validation
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!password.match(passwordPattern)) {
            return res.status(400).json({ error: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.' });
        }

        // Check if email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'This email is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ fullName, email, password: hashedPassword, type });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update user information
/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: Update user information
 *     description: Update user's full name and password, email cannot be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               fullName:
 *                 type: string
 *                 description: User's full name
 *               password:
 *                 type: string
 *                 description: New password
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/edit', async (req, res) => {
    try {
        const { email, fullName, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Validate fullName format, only letters allowed
        if (fullName) {
            if (!/^[A-Za-z]+$/.test(fullName)) {
                return res.status(400).json({ error: 'Full name can only contain letters, no spaces or special characters' });
            }
            user.fullName = fullName;
        }

        // Validate password format
        if (password) {
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!password.match(passwordPattern)) {
                return res.status(400).json({ error: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.' });
            }
            user.password = await bcrypt.hash(password, 10);
        }

        // Save user information
        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete user
/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Delete user
 *     description: Delete user by email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/delete', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOneAndDelete({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users, including full name, email, and type (role). Passwords are not included in the response.
 *     responses:
 *       200:
 *         description: Returns user list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fullName:
 *                         type: string
 *                         description: User's full name
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         description: User's email
 *                         example: "john.doe@northeastern.edu"
 *                       type:
 *                         type: string
 *                         description: User's role type (either "admin" or "employee")
 *                         example: "admin"
 *       500:
 *         description: Server error
 */

// 获取所有用户
router.get('/getAll', async (req, res) => {
    try {
        // 只查询 fullName, email, type 字段，不返回 password
        const users = await User.find({}, 'fullName email type');
        res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Upload user image
/**
 * @swagger
 * /user/uploadImage:
 *   post:
 *     summary: Upload user image
 *     description: Upload image file, only JPEG, PNG, GIF formats allowed. Each user can upload only one image.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: User's image file
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Image uploaded successfully"
 *                 filePath:
 *                   type: string
 *                   example: "/images/123456789_image.jpg"
 *       400:
 *         description: Invalid image format or user already uploaded an image
 *       404:
 *         description: User not found
 */
router.post('/uploadImage', upload.single('image'), async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.image) {
            return res.status(400).json({ error: 'User has already uploaded an image' });
        }

        user.image = `/images/${req.file.filename}`;
        await user.save();

        res.status(201).json({ message: 'Image uploaded successfully', filePath: user.image });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 查找用户
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 验证密码
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // 登录成功
        res.status(200).json({
            message: 'Login successful',
            user: {
                fullName: user.fullName,
                email: user.email,
                type: user.type, // 返回 type 字段
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Upload company image
/**
 * @swagger
 * /user/uploadCompanyImage:
 *   post:
 *     summary: Upload company image
 *     description: Upload a company image. Only JPEG, PNG, and GIF formats are allowed. Each user can upload multiple company images.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email (required for identification)
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Company image files
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Company images uploaded successfully"
 *                 filePaths:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["/images/123456789_image1.jpg", "/images/123456789_image2.jpg"]
 *       400:
 *         description: Invalid image format or user already uploaded images
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/uploadCompanyImage', upload.array('images', 5), async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if user has already uploaded company images
        const newImagePaths = req.files.map(file => `/images/${file.filename}`);

        // Add new images to the user's companyImages array
        user.companyImages = user.companyImages.concat(newImagePaths);
        await user.save();

        res.status(201).json({
            message: 'Company images uploaded successfully',
            filePaths: user.companyImages
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/getCompanyImages', async (req, res) => {
    try {
        const users = await User.find({}, 'fullName companyImages');

        const companyImages = users.map(user => ({
            fullName: user.fullName,
            images: user.companyImages
        }));

        res.status(200).json({ companyImages });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
/**
 * @swagger
 * /job/create:
 *   post:
 *     summary: Create a new job
 *     description: This endpoint allows you to create a new job with company name, job title, description, and Rating.
 *     tags:
 *       - Jobs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Contact:
 *                 type: string
 *               description:
 *                 type: string
 *               Rating:
 *                 type: number
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 job:
 *                   type: object
 *                   properties:
 *                     Name:
 *                       type: string
 *                     Contact:
 *                       type: string
 *                     description:
 *                       type: string
 *                     Rating:
 *                       type: number
 *       400:
 *         description: Bad request, missing required fields
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /job/getjob:
 *   get:
 *     summary: Get job details
 *     description: This endpoint returns job details from the database.
 *     tags:
 *       - Jobs
 *     responses:
 *       200:
 *         description: Successfully retrieved job details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Name:
 *                   type: string
 *                 Contact:
 *                   type: string
 *                 description:
 *                   type: string
 *                 Rating:
 *                   type: number
 *       500:
 *         description: Server error
 */
module.exports = router;
