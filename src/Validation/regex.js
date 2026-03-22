

export const regex = {
 name: /^[A-Za-z\u0600-\u06FF ]{2,}$/,
 email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
 password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

}