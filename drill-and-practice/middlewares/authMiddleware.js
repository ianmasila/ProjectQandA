const restrictedPaths = ["/topics", "/quiz"];

const authMiddleware = async (context, next) => {
    const user = await context.state.session.get("user");
    
    // if (!user && restrictedPaths.some((path) => {
    //     context.request.url.pathname.startsWith(path)
    // }))
    if (!user && (context.request.url.pathname.startsWith("/topics") 
                || context.request.url.pathname.startsWith("/quiz"))) {
        context.response.redirect("/auth/login");
    } else {
        await next();
    }
};

export { authMiddleware }