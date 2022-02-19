module.exports = class UserDto {
    email;
    id;
    constructor(model, role) {
        this.email = model.email;
        this.id = model._id;
        if(role) {
            this.role = role
        }
    }
}