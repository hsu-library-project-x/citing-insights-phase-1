module.exports = {
    //Insert Secret Keys from Google Login API here
    'googleAuth': {
        'clientID': "203897182687-jre1rt3vp7lgqi1nvpo3p2gp8jgpreno.apps.googleusercontent.com",
        'clientSecret': "cZgZQVlt00JCytjc3jgDyZ2T",
    },
    'db': {
        'host': process.env.DB_HOST || 'localhost',
        'port': process.env.DB_PORT || '27017',
        'name': process.env.DB_NAME || 'test'
    }
    
};