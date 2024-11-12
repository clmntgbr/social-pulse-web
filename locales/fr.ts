export default {
  navigation: {
    workspace: {
      empty: "Aucun workspace trouvé.",
      create: {
        button: "Créer un workspace",
        title: "Créer un Workspace",
        description: "Ajoutez un nouveau workspace pour gérer les comptes sociaux et les publications.",
        form: {
          name: "Nom",
          logo: "Logo",
          cancel: "Annuler",
          confirm: "Confirmer",
        },
      },
    },
  },
  pages: {
    workspaces: {
      title: "Workspaces",
      description:
        "Gérez et organisez vos workspaces. Créez de nouveaux environnements collaboratifs, configurez les autorisations d'accès et rationalisez votre flux de travail sur les réseaux sociaux, le tout en un seul endroit.",
      widget: {
        manage: {
          description: "Mettez à jour les paramètres de votre workspace. Définissez le nom et l'avatar de votre workspace.",
          form: {
            name: "Nom",
            logo: "Logo",
            tips: "Vous pouvez changer le logo du workspace en cliquant dessus",
            save: "Enregistrer",
          },
          leave: {
            button: "Quitter ce workspace",
            title: "Quitter le workspace {name} ?",
            cancel: "Annuler",
            confirm: "Confirmer",
            description: {
              accept: "Êtes-vous sûr de vouloir partir ?",
              denied: "Vous ne pouvez pas quitter ce workspace car vous êtes l'administrateur actuel. Veuillez attribuer les droits d'administrateur à un autre utilisateur et réessayez.",
            },
          },
          delete: {
            button: "Supprimer ce workspace",
            title: "Supprimer le workspace {name} ?",
            cancel: "Annuler",
            confirm: "Confirmer",
            description:
              "La suppression de ce workspace entraînera la suppression définitive de toutes les données associées, y compris les réseaux sociaux, les accès utilisateurs et les paramètres du workspace. Cette action est irréversible. Veuillez confirmer si vous êtes sûr de vouloir continuer.",
          },
        },
        socialAccount: {
          title: "Réseaux sociaux",
          description:
            "Connectez et gérez vos comptes de réseaux sociaux pour simplifier la publication de contenu. Connectez des plateformes telles que Twitter, LinkedIn et Facebook pour publier directement depuis ce workspace.",
          none: "Aucun réseau social disponible",
        },
        members: {
          title: "Inviter des personnes à collaborer",
          description: "Vous pouvez inviter des membres existants à collaborer sur ce workspace, leur donnant ainsi la permission de modifier et de contribuer avec vous.",
          button: "Envoyer une invitation",
          access: "Personnes ayant accès",
          you: "Vous",
          administrator: "Administrateur",
          member: "Membre",
          promote: {
            title: "Promouvoir {name} au rang d'administrateur",
            description:
              "Vous perdrez votre statut d'administrateur et accorderez à cet utilisateur les droits d'administrateur pour gérer les paramètres du workspace et ses membres. Confirmez cette action pour lui fournir des privilèges avancés d'accès et de gestion.",
            cancel: "Annuler",
            confirm: "Confirmer",
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
} as const;
