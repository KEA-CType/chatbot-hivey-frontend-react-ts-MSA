export const botSteps = [
    {
        id: '1',
        message: 'Welcome to our survey space website. Our chatbot is here to help you with any questions or concerns you may have. How can we assist you?',
        trigger: 'assist_options',
    },
    {
        id: 'assist_options',
        options: [
            {value: 'about_site', label: 'What this site is about?', trigger: 'about_site'},
            {value: 'make_space', label: 'How to make new space?', trigger: 'make_space'},
            {value: 'invite_member', label: 'How to invite member to my space?', trigger: 'invite_member'},
            {value: 'make_survey', label: 'How to make survey?', trigger: 'make_survey'},
            {value: 'call_developer', label: 'I have another question', trigger: 'call_developer'},
        ],
    },
    {
        id: 'about_site',
        message: 'Our site is designed to help you create and manage surveys for your organization. You can create survey spaces, invite members, and view survey results all in one place.',
        trigger: 'assist_options',
    },
    {
        id: 'make_space',
        message: 'To make a new space, go to the main page and click the "Add Space" button. From there, you can customize your space and invite members to join.',
        trigger: 'assist_options',
    },
    {
        id: 'invite_member',
        message: 'To invite members to your space, go to your space and click the "Invite Members" button. From there, you can enter their email addresses and send out invitations.',
        trigger: 'assist_options',
    },
    {
        id: 'make_survey',
        message: 'To create a survey, go to your space and click the "Create Survey" button. From there, you can customize your survey and send it out to members.',
        trigger: 'assist_options',
    },
    {
        id: 'survey_results',
        message: 'To check survey results, go to your space and click the "View Results" button. From there, you can see responses and analyze data.',
        trigger: 'assist_options',
    },
    {
        id: 'call_developer',
        message: 'please contact our developer: annabcd99@gachon.ac.kr',
        trigger: 'assist_options',
    },
];
