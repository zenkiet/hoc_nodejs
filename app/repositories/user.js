const login = async ({ email, password }) => {
    console.log(email, password)
}

const register = async ({ email, password, name, phone, address }) => {
    console.log(`
        Register user with: 
        email: ${email} 
        password: ${password} 
        name: ${name} 
        phone: ${phone}
        address: ${address}
    `);
}

export default {
    login,
    register
}