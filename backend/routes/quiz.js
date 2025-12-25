import express from 'express';
import nodemailer from 'nodemailer';
import QuizAnswer from '../models/QuizAnswer.js';

const router = express.Router();

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // or 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Get all quiz answers
router.get('/', async (req, res) => {
    try {
        const answers = await QuizAnswer.find().sort({ answeredAt: -1 });
        res.json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Submit quiz answers
router.post('/', async (req, res) => {
    try {
        const answers = req.body.answers;
        
        // Save to database
        const savedAnswers = await QuizAnswer.insertMany(answers);
        
        // Format answers for email
        let answerHTML = '<div style="font-family: Arial, sans-serif;">';
        answers.forEach((answer, index) => {
            answerHTML += `
                <div style="background: #f9f9f9; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #ff69b4;">
                    <p><strong>Question ${index + 1}:</strong> ${answer.question || 'N/A'}</p>
                    <p><strong>Answer:</strong> ${answer.answer || 'N/A'}</p>
                </div>
            `;
        });
        answerHTML += '</div>';
        
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Sends to yourself
            subject: '💕 New Anniversary Quiz Submission!',
            html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #ff69b4; text-align: center;">Someone Completed Your Anniversary Quiz! 🎉</h2>
                    <p style="color: #666; text-align: center;">Submitted on: ${new Date().toLocaleString()}</p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;">
                    ${answerHTML}
                    <hr style="border: 1px solid #eee; margin: 20px 0;">
                    <p style="text-align: center; color: #999; font-size: 12px;">
                        This email was automatically sent from your Anniversary Website
                    </p>
                </div>
            `
        };
        
        // Send email (don't wait for it, send response immediately)
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent successfully:', info.response);
            }
        });
        
        // Respond immediately to client
        res.status(201).json({
            success: true,
            message: 'Quiz submitted successfully!',
            data: savedAnswers
        });
        
    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(400).json({ message: error.message });
    }
});

export default router;