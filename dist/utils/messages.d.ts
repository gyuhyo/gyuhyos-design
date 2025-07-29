declare const messages: {
    search: {
        success: {
            title: string;
            body: string;
        };
        error: {
            title: string;
            body: string;
        };
    };
    add: {
        parent: {
            unsaved: {
                title: string;
                body: string;
            };
            unfocused: {
                title: string;
                body: string;
            };
        };
    };
    save: {
        parent: {
            unsaved: {
                title: string;
                body: string;
            };
            unfocused: {
                title: string;
                body: string;
            };
        };
        validation: {
            title: string;
            body: string;
        };
        success: {
            title: string;
            body: string;
        };
        error: {
            title: string;
            body: string;
        };
    };
    delete: {
        confirm: {
            title: string;
            body: string;
        };
        success: {
            title: string;
            body: string;
        };
        error: {
            title: string;
            body: string;
        };
    };
    more: {
        checked: {
            title: string;
            body: string;
        };
        unknown: {
            title: string;
            body: string;
        };
    };
};
export default messages;
