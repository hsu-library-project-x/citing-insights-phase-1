module.exports = {
    'googleAuth': {
        'clientID': process.env.CLIENT_ID || '',
        'clientSecret': process.env.CLIENT_SECRET || '',
    },
    'db': {
        'host': process.env.DB_HOST || 'localhost',
        'port': process.env.DB_PORT || '27017',
        'name': process.env.DB_NAME || 'test'
    }
    
};