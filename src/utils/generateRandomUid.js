const generateRandomUid = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomUid = '';
    
    for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomUid += characters.charAt(randomIndex);
    }

    return randomUid;
};

export default generateRandomUid;
