const sendTokenResponse = (user, statusCode, res, message) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({success: true, token, message});
}

export default sendTokenResponse;