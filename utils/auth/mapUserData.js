export const mapUserData = (user) => {
    const { uid, xa} = user
    return {
        id: uid,
        token: xa,
    }
}