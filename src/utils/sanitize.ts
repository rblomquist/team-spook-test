export const sanitize =(args)=>{
    const sanitizedArgs = args;
    Object.keys(args).forEach(key => {
      sanitizedArgs[key] = encodeURIComponent(args[key]);
    });
    return sanitizedArgs
}

