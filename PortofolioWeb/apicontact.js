const querystring = require('querystring');

export default function handler(req, res) {
    if (req.method === 'POST') {
        const body = req.body;
        if (typeof body !== 'string') {
            return res.status(400).json({ success: false, message: 'Invalid request body' });
        }
        const params = querystring.parse(body);
        const { name, email, message } = params;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Please fill all fields' });
        }
        // Logika untuk mengirim email atau menyimpan data bisa ditambahkan di sini
        console.log('Contact form submission:', { name, email, message });
        return res.status(200).json({ success: true, message: 'Thank you for your message!' });
    } else {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}