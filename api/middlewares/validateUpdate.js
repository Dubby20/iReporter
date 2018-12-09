// const validateLocation = (request, response, next) => {
//   const {
//     location
//   } = request.body.location;

//   const locationRegex = /^([-+]?\d{1,2}([.]\d+)?),\s*([-+]?\d{1,3}([.]\d+)?)$/;
//   if (!location || location.trim().length < 1) {
//     return response.status(422).json({
//       status: 422,
//       error: 'Please enter a location'
//     });
//   }
//   if (!locationRegex.test(location)) {
//     return response.status(422).json({
//       status: 422,
//       error: 'Please enter a valid location'
//     });
//   }
//   next();
// };

// export default validateLocation;