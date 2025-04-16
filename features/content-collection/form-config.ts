// Form configuration data structure
export const formConfig = {
  title: "Digital Content Submission Form",
  description: "Tech Global Institute",
  sections: [
    {
      id: "purpose",
      title: "1. Purpose",
      description:
        "This form is used by the authorized institution to collect digital forensic content for the purpose of electronic device and/or digital content analysis, storage, research, and preservation. The forensic content will be handled according to law and policy. The purpose of the data collection is to securely store digital evidence and information that will be used for the intended purpose only.",
      fields: [],
    },
    {
      id: "content-info",
      title: "2. Digital Content Information",
      fields: [
        {
          id: "deviceModel",
          type: "text",
          label: "Device (Mobile/Camera Model)",
          placeholder: "e.g., iPhone 13 Pro",
          required: true,
        },
        {
          id: "counts",
          type: "group",
          layout: "grid",
          gridCols: 4,
          fields: [
            {
              id: "photoCount",
              type: "number",
              label: "Photos",
              min: 0,
              required: true,
            },
            {
              id: "videoCount",
              type: "number",
              label: "Videos",
              min: 0,
              required: true,
            },
            {
              id: "audioCount",
              type: "number",
              label: "Audio",
              min: 0,
              required: true,
            },
            {
              id: "otherCount",
              type: "number",
              label: "Others",
              min: 0,
              required: true,
            },
          ],
        },
        {
          id: "contentDateTime",
          type: "datetime",
          label: "Date and Time of Photos/Videos/Audio",
          required: true,
        },
        {
          id: "fileFormat",
          type: "text",
          label: "File Format",
          placeholder: "e.g., JPG, MP4, MP3",
          required: true,
        },
        {
          id: "contentDescription",
          type: "textarea",
          label: "Brief Description of Content",
          placeholder: "Provide a brief description of the content",
          minLength: 10,
          required: true,
        },
      ],
    },
    {
      id: "consent",
      title: "3. Consent, Permission, and Signature",
      fields: [
        {
          id: "consent",
          type: "checkbox",
          label:
            "I hereby give permission to Tech Global Institute to use the digital content listed above for forensic purposes. By signing this form, I confirm that I am the rightful owner/user of the content and that it can be stored, analyzed, researched, and discussed for the intended purpose. If necessary, a third party forensic expert may be consulted. I understand the above terms and agree to them. I can withdraw my consent at any time.",
          required: true,
        },
      ],
    },
    {
      id: "submitter-info",
      title: "4. Digital Content Submitter's Information",
      fields: [
        {
          id: "submitterName",
          type: "text",
          label: "Name",
          required: true,
        },
        {
          id: "submitterAddress",
          type: "text",
          label: "Address",
          required: true,
        },
        {
          id: "submitterMobile",
          type: "text",
          label: "Mobile Number",
          required: true,
        },
        {
          id: "submissionDate",
          type: "date",
          label: "Date",
          required: true,
        },
      ],
    },
  ],
  submitButtonText: "Submit Form",
};
