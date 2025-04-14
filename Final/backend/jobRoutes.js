const express = require('express');
const router = express.Router();
const Job = require('./Job');  // 根据你的项目结构调整路径

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
router.post('/create', async (req, res) => {
    try {
        const { Name, Contact, description, Rating } = req.body;

        if (!Name || !Contact || !description || !Rating) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newJob = new Job({ Name, Contact, description, Rating });
        
        await newJob.save();  // 将数据保存到数据库

        res.status(201).json({ message: 'Question created successfully', job: newJob });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


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
router.get('/getjob', async (req, res) => {
    try {
        // 获取所有职位
        const jobs = await Job.find();  // 返回所有职位数据

        if (jobs.length === 0) {
            return res.status(404).json({ error: 'No Question found' });
        }

        res.status(200).json(jobs);  // 返回职位数据
    } catch (error) {
        console.error('Error fetching job:', error);  // 打印详细错误信息
        res.status(500).json({ error: 'Server error' });
    }
});



module.exports = router;
