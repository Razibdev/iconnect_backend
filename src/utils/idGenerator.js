const generateUniqueId = () => {
    // Get the current timestamp in milliseconds
    const timestamp = new Date().getTime();

    // Generate a random number between 100000 and 999999
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    // Combine timestamp and random number
    const uniqueId = `${timestamp}${randomNumber}`;

    // Extract the last 6 digits to ensure it's a 6-digit number
    return uniqueId.slice(-6);
};

module.exports = generateUniqueId;
