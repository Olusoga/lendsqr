import jwt from 'jsonwebtoken'
export function createVerificationToken(payload:any){
return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"20m"})
}
      