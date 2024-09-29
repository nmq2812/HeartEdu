export const loginAction = async (credentials: LoginCredentials) => {
    try {
        const response = await fetch('', {
            method: 'POST',
            body: JSON.stringify({ user: credentials }),
            headers: { 'Content-Type': 'application/json' },
        });

        const res = await response;
        if (response.status === 200) {
            return res;
        } else {
            return {
                success: false,
                message: { errors: { message: 'Unexpected error' } },
            };
        }
    } catch (error) {
        return {
            success: false,
            message: { errors: { message: `An error occurred: ${error}` } },
        };
    }
};

export const createAccountAction = async (credentials: SignupCredentials) => {
    try {
        const response = await fetch('', {
            method: 'POST',
            body: JSON.stringify({ user: credentials }),
            headers: { 'Content-Type': 'application/json' },
        });

        const res = await response;
        if (response.status === 200) {
            return res;
        } else {
            return {
                success: false,
                message: { errors: { message: 'Unexpected error' } },
            };
        }
    } catch (error) {
        return {
            success: false,
            message: { errors: { message: `An error occurred: ${error}` } },
        };
    }
};
