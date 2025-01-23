import prompts from "prompts";

(async () => {
    const response = await prompts({
        type: "select",
        name: "action",
        message: "What would you like to do?",
        choices: [
            { title: "Create Account", value: "create" },
            { title: "Login", value: "login" },
            { title: "Exit", value: "exit" },
        ],
    });

    console.log(response);
})();
