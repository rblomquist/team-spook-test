class NoDataError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}
export const ManageQueryAnswer = (response, type, id = null) => {
    if (response && response.length > 0 || response && Object.keys(response).length > 0) {
        return response;
    }
    else {
        throw new NoDataError(id ? `There are no ${type} with the id ${id}` : `There are no ${type} in the Database`);
    }
};
