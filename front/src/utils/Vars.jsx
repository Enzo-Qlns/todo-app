const Vars =
{
    getHost() {
        const ctx = process.env;
        return ctx.REACT_APP_HTTP_PROTOCOL + "://" + ctx.REACT_APP_API_HOST + ":" + ctx.REACT_APP_PORT;
    },
};
export default Vars;