module.exports = class UserDto {
    email;
    id;
    isActive;
    constructor(model, role) {
        this.email = model.email;
        this.id = model._id;
        this.isActive = model.isActive;
        if(role) {
            this.role = role
        }
    }
}