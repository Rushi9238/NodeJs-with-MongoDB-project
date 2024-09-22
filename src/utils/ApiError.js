export class ApiError extends Error{
    constructor(
        statusCode,
        message="Sometings went wrong",
        errors=[],
        statck=""
    ){
        super()
        this.statusCode=statusCode,
        this.data=[],
        this.errors=errors,
        this.message=message,
        this.success=false

        if(statck){
            this.stack=statck
        }else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}