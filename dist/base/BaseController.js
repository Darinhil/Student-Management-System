export class BaseController {
    sendSuccess(res, data, message = 'Success', statusCode = 200) {
        res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }
    sendError(res, message, statusCode = 400, data) {
        res.status(statusCode).json({
            success: false,
            message,
            data,
        });
    }
    async handleAsyncError(res, asyncFn) {
        try {
            await asyncFn();
        }
        catch (error) {
            console.error('Controller Error:', error);
            this.sendError(res, error.message || 'Internal server error', 500);
        }
    }
}
