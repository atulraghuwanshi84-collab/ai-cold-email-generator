import express from 'express' ;
import dotenv from 'dotenv'
import cors from 'cors' ;
import { GoogleGenAI } from '@google/genai';

dotenv.config() ;
const app = express() ;

const PORT = process.env.PORT || 5000 ;
app.use(cors()) ;

app.use(express.json()) ;

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY) ;

app.get('/',(req,res) => {
    res.send('AI Cold Email generator Backend is running!') ;

}) ;

app.listen(PORT,() => {
    console.log(`server is sailing smoothly on port ${PORT}`) ;

}) ;

app.post('/generate-email', async (req, res) => {
    // 1. Add tone to the destructured body fields
    const { recipientName, companyName, myRole, valueProp, senderName, tone } = req.body;

    // 2. Validate it along with the other required fields
    if (!recipientName || !companyName || !valueProp || !senderName || !tone) {
        return res.status(400).json({ error: "Please provide all required fields." });
    }

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `
                You are a career coaching expert and professional resume writer. 
                Write a highly personalized, compelling cold email from a job seeker to a potential employer/hiring manager.
                
                The overall tone and style of the email must be strictly: ${tone}. 
                (If 'Short & Punchy', make it under 80 words and highly direct. If 'Formal/Corporate', use polished, traditional corporate language. If 'Casual/Startup', keep it innovative, enthusiastic, and conversational).

                Sender's Details:
                - Name: ${senderName}
                - Role/Background: ${myRole || 'Professional'}
                - Key Skills/Value Proposition to contribute: ${valueProp}
                
                Recipient's Details:
                - Manager Name: ${recipientName}
                - Company Name: ${companyName}
                
                The email must follow these exact constraints:
                1. Subject Line: Must be catchy, professional, match the chosen ${tone} vibe, and clearly state intent.
                2. Structure: Include a hook referencing ${companyName}, a value pivot aligning the sender's background (${myRole}), a breakdown of skills (${valueProp}), and an introductory call CTA.
                3. Length: Keep it under 150 words total. Break it into short paragraphs.
                
                CRITICAL: Sign off the email using the provided Sender's Name (${senderName}). Do not use placeholders like "[Your Name]".
            `,
        });

        res.json({ email: response.text });

    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ error: "Failed to generate email." });
    }
});