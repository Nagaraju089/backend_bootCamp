module.exports = fn => {
    return(req, res, next) => { 
    fn(req, res, next).catch(next); //if error occurs while creating, then that error will be handled in error handling middeware
    }
}