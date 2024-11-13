export default {
  navigation: {
    workspace: {
      empty: "No workspace found.",
      create: {
        button: "Create a workspace",
        title: "Create a Workspace",
        description: "Add a new workspace to manage social accounts & posts.",
        form: {
          name: "Name",
          logo: "Logo",
          cancel: "Cancel",
          confirm: "Confirm",
        },
      },
    },
    language: {
      french: "French",
      english: "English",
      xx: "Test",
    },
  },
  pages: {
    workspaces: {
      title: "Workspaces",
      description: "Manage and organize your workspaces. Create new collaborative environments, configure access permissions, and streamline your social accounts workflow all in one place.",
      widget: {
        manage: {
          description: "Update your workspace settings. Set your workspace name and avatar.",
          form: {
            name: "Name",
            logo: "Logo",
            tips: "You can change the workspace logo by clicking on it",
            save: "Save",
          },
          leave: {
            button: "Leave this workspace",
            title: "Leaving {name} workspace ?",
            cancel: "Cancel",
            confirm: "Confirm",
            description: {
              accept: "Are you sure you want to leave ?",
              denied: "You cannot leave this workspace as you are the current administrator. Please assign administrator rights to another user and try again.",
            },
          },
          delete: {
            button: "Delete this workspace",
            title: "Deleting {name} workspace ?",
            cancel: "Cancel",
            confirm: "Confirm",
            description:
              "Deleting this workspace will permanently remove all associated data, including social accounts, user access, and workspace settings. This action cannot be undone. Please confirm if you are sure you want to proceed.",
          },
        },
        socialAccount: {
          title: "Social Accounts",
          description: "Connect and manage your social media accounts to streamline your content publishing. Link platforms like Twitter, LinkedIn, and Facebook to post directly from this workspace.",
          none: "No social accounts available",
        },
        members: {
          title: "Invite people to collaborate",
          description: "You can invite existing members to collaborate on this workspace, giving them permission to edit and contribute alongside you.",
          button: "Send invitation",
          access: "People with access",
          you: "You",
          administrator: "Administrator",
          member: "Member",
          pending: {
            title: "Pending invitations",
          },
          promote: {
            title: "Promote {name} to Administrator",
            description:
              "You will lose your administrator status and grant this user administrator rights to manage workspace settings and members. Confirm this action to provide them with advanced access and management privileges.",
            cancel: "Cancel",
            confirm: "Confirm",
          },
        },
      },
    },
    socialAccounts: {
      title: "Social Accounts",
      description:
        "Manage and centralize your social media accounts to simplify content publishing. Connect your social profiles, track performance metrics, and coordinate posts from one place to enhance your workflow.",
    },
  },
  posts: {
    status: {
      programmed: "Programmed",
      draft: "Draft",
      posted: "Posted",
      failed: "Failed",
    },
  },
  socialAccounts: {
    status: {
      is_actif: "Active",
      expire_soon: "Expire Soon",
      is_expired: "Is Expired",
    },
  },
} as const;
