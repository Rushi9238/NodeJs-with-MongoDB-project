// Promise method

export const asyncHandler = (requestHandeler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandeler(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

// Try Catch Method

// export const asyncHandler=(asyncFunction)=>{
//     return async()=>{

//     }
// }

// export const asyncHandler=()=>(
//     ()=>{

//     }
// )

// export const asyncHandler =(asyncFunction)=>async(req,res,next)=>{
// try{
//     await asyncFunction(req,res,next)
// }catch(error){
//     res.status(error.code || 500).json({
//         success:false,
//         message:error.message
//     })
// }
// }
