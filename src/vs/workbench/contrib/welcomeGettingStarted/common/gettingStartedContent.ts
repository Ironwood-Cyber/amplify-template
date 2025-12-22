/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import 'vs/workbench/contrib/welcomeGettingStarted/common/media/theme_picker';
import 'vs/workbench/contrib/welcomeGettingStarted/common/media/notebookProfile';
import { localize } from 'vs/nls';
import { Codicon } from 'vs/base/common/codicons';
import { ThemeIcon } from 'vs/base/common/themables';
import { registerIcon } from 'vs/platform/theme/common/iconRegistry';
import { NotebookSetting } from 'vs/workbench/contrib/notebook/common/notebookCommon';


const setupIcon = registerIcon('getting-started-setup', Codicon.zap, localize('getting-started-setup-icon', "Icon used for the setup category of welcome page"));
const beginnerIcon = registerIcon('getting-started-beginner', Codicon.lightbulb, localize('getting-started-beginner-icon', "Icon used for the beginner category of welcome page"));


export type BuiltinGettingStartedStep = {
	id: string;
	title: string;
	description: string;
	completionEvents?: string[];
	when?: string;
	media:
	| { type: 'image'; path: string | { hc: string; hcLight?: string; light: string; dark: string }; altText: string }
	| { type: 'svg'; path: string; altText: string }
	| { type: 'markdown'; path: string };
};

export type BuiltinGettingStartedCategory = {
	id: string;
	title: string;
	description: string;
	isFeatured: boolean;
	next?: string;
	icon: ThemeIcon;
	when?: string;
	content:
	| { type: 'steps'; steps: BuiltinGettingStartedStep[] };
};

export type BuiltinGettingStartedStartEntry = {
	id: string;
	title: string;
	description: string;
	icon: ThemeIcon;
	when?: string;
	content:
	| { type: 'startEntry'; command: string };
};

type GettingStartedWalkthroughContent = BuiltinGettingStartedCategory[];
type GettingStartedStartEntryContent = BuiltinGettingStartedStartEntry[];

export const startEntries: GettingStartedStartEntryContent = [
	{
		id: 'welcome.openAgentExplorer',
		title: localize('gettingStarted.agentExplorer.title', "View agent sessions..."),
		description: localize('gettingStarted.agentExplorer.description', "View the SSH agent sessions established during the assessment."),
		icon: Codicon.goToFile,
		content: {
			type: 'startEntry',
			command: 'command:welcome.openAgentExplorer',
		}
	},
	{
		id: 'viewElements',
		title: localize('gettingStarted.viewElements.title', "View found assets and elements..."),
		description: localize('gettingStarted.viewElements.description', "View the assets and elements discovered."),
		icon: Codicon.goToFile,
		when: 'isWeb || !isMac',
		content: {
			type: 'startEntry',
			command: 'command:workbench.view.extension.exploreViewContainer',
		}
	},
	{
		id: 'viewFindings',
		title: localize('gettingStarted.viewFindings.title', "View findings..."),
		description: localize('gettingStarted.viewFindings.description', "View findings from the assessment."),
		icon: Codicon.goToFile,
		when: 'isWeb || !isMac',
		content: {
			type: 'startEntry',
			command: 'command:workbench.view.extension.findingsViewContainer',
		}
	},
	{
		id: 'viewActions',
		title: localize('gettingStarted.viewActions.title', "View assessment actions..."),
		description: localize('gettingStarted.viewActions.description', "View the actions that were run against the assets found."),
		icon: Codicon.goToFile,
		when: 'isWeb || !isMac',
		content: {
			type: 'startEntry',
			command: 'command:workbench.view.extension.actionsViewContainer',
		}
	},
	{
		id: 'topLevelOpenFolder',
		title: localize('gettingStarted.openFolder.title', "Open Folder..."),
		description: localize('gettingStarted.openFolder.description', "Open a folder to start working"),
		icon: Codicon.folderOpened,
		when: '!isWeb && !isMac',
		content: {
			type: 'startEntry',
			command: 'command:workbench.action.files.openFolder',
		}
	},
	{
		id: 'topLevelShowWalkthroughs',
		title: localize('gettingStarted.topLevelShowWalkthroughs.title', "Open a Walkthrough..."),
		description: localize('gettingStarted.topLevelShowWalkthroughs.description', "View a walkthrough on the editor or an extension"),
		icon: Codicon.checklist,
		when: 'allWalkthroughsHidden',
		content: {
			type: 'startEntry',
			command: 'command:welcome.showAllWalkthroughs',
		}
	},
	{
		id: 'topLevelRemoteOpen',
		title: localize('gettingStarted.topLevelRemoteOpen.title', "Connect to..."),
		description: localize('gettingStarted.topLevelRemoteOpen.description', "Connect to remote development workspaces."),
		when: '!isWeb',
		icon: Codicon.remote,
		content: {
			type: 'startEntry',
			command: 'command:workbench.action.remote.showMenu',
		}
	},
];

const Button = (title: string, href: string) => `[${title}](${href})`;

export const walkthroughs: GettingStartedWalkthroughContent = [
	{
		id: 'Setup',
		title: localize('gettingStarted.setup.title', "Get Started with VS Code"),
		description: localize('gettingStarted.setup.description', "Customize your editor, learn the basics, and start coding"),
		isFeatured: true,
		icon: setupIcon,
		when: '!isWeb',
		next: 'Beginner',
		content: {
			type: 'steps',
			steps: [
				{
					id: 'pickColorTheme',
					title: localize('gettingStarted.pickColor.title', "Choose your theme"),
					description: localize('gettingStarted.pickColor.description.interpolated', "The right theme helps you focus on your code, is easy on your eyes, and is simply more fun to use.\n{0}", Button(localize('titleID', "Browse Color Themes"), 'command:workbench.action.selectTheme')),
					completionEvents: [
						'onSettingChanged:workbench.colorTheme',
						'onCommand:workbench.action.selectTheme'
					],
					media: { type: 'markdown', path: 'theme_picker', }
				},
				{
					id: 'extensionsWeb',
					title: localize('gettingStarted.extensions.title', "Code with extensions"),
					description: localize('gettingStarted.extensionsWeb.description.interpolated', "Extensions are VS Code's power-ups. A growing number are becoming available in the web.\n{0}", Button(localize('browsePopularWeb', "Browse Popular Web Extensions"), 'command:workbench.extensions.action.showPopularExtensions')),
					when: 'workspacePlatform == \'webworker\'',
					media: {
						type: 'svg', altText: 'VS Code extension marketplace with featured language extensions', path: 'extensions-web.svg'
					},
				},
				{
					id: 'settings',
					title: localize('gettingStarted.settings.title', "Tune your settings"),
					description: localize('gettingStarted.settings.description.interpolated', "Customize every aspect of VS Code and your extensions to your liking. Commonly used settings are listed first to get you started.\n{0}", Button(localize('tweakSettings', "Open Settings"), 'command:toSide:workbench.action.openSettings')),
					media: {
						type: 'svg', altText: 'VS Code Settings', path: 'settings.svg'
					},
				},
				{
					id: 'settingsSync',
					title: localize('gettingStarted.settingsSync.title', "Sync settings across devices"),
					description: localize('gettingStarted.settingsSync.description.interpolated', "Keep your essential customizations backed up and updated across all your devices.\n{0}", Button(localize('enableSync', "Backup and Sync Settings"), 'command:workbench.userDataSync.actions.turnOn')),
					when: 'syncStatus != uninitialized',
					completionEvents: ['onEvent:sync-enabled'],
					media: {
						type: 'svg', altText: 'The "Turn on Sync" entry in the settings gear menu.', path: 'settingsSync.svg'
					},
				},
				{
					id: 'commandPaletteTask',
					title: localize('gettingStarted.commandPalette.title', "Unlock productivity with the Command Palette "),
					description: localize('gettingStarted.commandPalette.description.interpolated', "Run commands without reaching for your mouse to accomplish any task in VS Code.\n{0}", Button(localize('commandPalette', "Open Command Palette"), 'command:workbench.action.showCommands')),
					media: { type: 'svg', altText: 'Command Palette overlay for searching and executing commands.', path: 'commandPalette.svg' },
				},
				{
					id: 'pickAFolderTask-Mac',
					title: localize('gettingStarted.setup.OpenFolder.title', "Open up your code"),
					description: localize('gettingStarted.setup.OpenFolder.description.interpolated', "You're all set to start coding. Open a project folder to get your files into VS Code.\n{0}", Button(localize('pickFolder', "Pick a Folder"), 'command:workbench.action.files.openFileFolder')),
					when: 'isMac && workspaceFolderCount == 0',
					media: {
						type: 'svg', altText: 'Explorer view showing buttons for opening folder and cloning repository.', path: 'openFolder.svg'
					}
				},
				{
					id: 'pickAFolderTask-Other',
					title: localize('gettingStarted.setup.OpenFolder.title', "Open up your code"),
					description: localize('gettingStarted.setup.OpenFolder.description.interpolated', "You're all set to start coding. Open a project folder to get your files into VS Code.\n{0}", Button(localize('pickFolder', "Pick a Folder"), 'command:workbench.action.files.openFolder')),
					when: '!isMac && workspaceFolderCount == 0',
					media: {
						type: 'svg', altText: 'Explorer view showing buttons for opening folder and cloning repository.', path: 'openFolder.svg'
					}
				},
				{
					id: 'quickOpen',
					title: localize('gettingStarted.quickOpen.title', "Quickly navigate between your files"),
					description: localize('gettingStarted.quickOpen.description.interpolated', "Navigate between files in an instant with one keystroke. Tip: Open multiple files by pressing the right arrow key.\n{0}", Button(localize('quickOpen', "Quick Open a File"), 'command:toSide:workbench.action.quickOpen')),
					when: 'workspaceFolderCount != 0',
					media: {
						type: 'svg', altText: 'Go to file in quick search.', path: 'search.svg'
					}
				},
				{
					id: 'videoTutorial',
					title: localize('gettingStarted.videoTutorial.title', "Watch video tutorials"),
					description: localize('gettingStarted.videoTutorial.description.interpolated', "Watch the first in a series of short & practical video tutorials for VS Code's key features.\n{0}", Button(localize('watch', "Watch Tutorial"), 'https://aka.ms/vscode-getting-started-video')),
					media: { type: 'svg', altText: 'VS Code Settings', path: 'learn.svg' },
				}
			]
		}
	},

	{
		id: 'SetupWeb',
		title: localize('gettingStarted.setupWeb.title', "Welcome to the Enlight™ Amplify Environment"), // allow-any-unicode-next-line
		description: localize('gettingStarted.setupWeb.description', "View risks around your assets, map attack paths, and interact with created agents all within one integrated penetration test environment."),
		isFeatured: true,
		icon: setupIcon,
		when: 'isWeb',
		next: 'Beginner',
		content: {
			type: 'steps',
			steps: [
				{
					id: 'pickColorThemeWeb',
					title: localize('gettingStarted.pickColor.title', "Choose your theme"),
					description: localize('gettingStarted.pickColor.description.interpolated', "The right theme helps you focus on your code, is easy on your eyes, and is simply more fun to use.\n{0}", Button(localize('titleID', "Browse Color Themes"), 'command:workbench.action.selectTheme')),
					completionEvents: [
						'onSettingChanged:workbench.colorTheme',
						'onCommand:workbench.action.selectTheme'
					],
					media: { type: 'markdown', path: 'theme_picker', }
				},
				{
					id: 'reviewFindingsWeb',
					title: localize('gettingStarted.setup.ReviewFindings.title', "Review Findings"),
					description: localize('gettingStarted.setup.ReviewFindings.description.interpolated', "Let's gain some visibility into your attack surface.The best place to start is to see if there are any low hanging fruits that can be fixed/exploited.\n{0}\n", Button(localize('viewFindings', "Open Findings"), 'command:workbench.view.extension.findingsViewContainer')),
					completionEvents: [
						'onView:workbench.view.extension.findingsViewContainer'
					],
					media: {
						type: 'svg', altText: 'Open findings page', path: ''
					}
				},
			]
		}
	},

	{
		id: 'Beginner',
		isFeatured: false,
		title: localize('gettingStarted.beginner.title', "Amplify Fundamentals"),
		icon: beginnerIcon,
		description: localize('gettingStarted.beginner.description', "Get an overview of important concepts"),
		content: {
			type: 'steps',
			steps: [
				{
					id: 'agents',
					title: localize('gettingStarted.agents.title', "Understanding agents"),
					description: localize('gettingStarted.agents.description.interpolated', "Agent sessions are remote access sessions that Enlight was able to establish either through found credentials or exploited RCE.\n{0}", Button(localize('viewAgents', "Open Agents"), 'command:workbench.extensions.action.viewAgents')),
					media: {
						type: 'svg', altText: 'agent view', path: ''
					},
				},
				{
					id: 'assets',
					title: localize('gettingStarted.assets.title', "Understanding assets and elements"),
					description: localize('gettingStarted.assets.description.interpolated', "Explore the elements that Enlight found. Take a deeper dive into information found about a subnet, host, found hash, credential, ports, and more.\n{0}", Button(localize('viewElements', "Open element explorer"), 'command:workbench.view.extension.exploreViewContainer')),
					media: {
						type: 'svg', altText: 'Integrated terminal running a few npm commands', path: ''
					},
				},
				{
					id: 'findings',
					title: localize('gettingStarted.findings.title', "Understanding findings"),
					description: localize('gettingStarted.findings.description.interpolated', "Findings are risks and vulnerabilities that Enlight found during your assessment. Filter by criticality to prioritize what's most important..\n{0}", Button(localize('viewFindings', "Open Findings"), 'command:workbench.view.extension.findingsViewContainer')),
					media: {
						type: 'svg', altText: 'Integrated terminal running a few npm commands', path: ''
					},
				},
				{
					id: 'actions',
					title: localize('gettingStarted.actions.title', "Undertanding assessment actions"),
					description: localize('gettingStarted.actions.description.interpolated', "Take a look at what was run on what element, from kerberoasting to vulnerability checks.\n{0}", Button(localize('viewActions', "Open actions"), 'command:workbench.view.extension.actionsViewContainer')),

					media: {
						type: 'svg', altText: 'Run and debug view.', path: '',
					},
				},
				{
					id: 'approvals',
					title: localize('gettingStarted.approvals.title', "Understanding approvals"),
					description: localize('gettingStarted.approvals.description.interpolated', "Sometimes Enlight will find an exploit that could cause disruption in the system. See what actions that Enlight need's human in the loop approval before continuing. (COMING SOON) \n{0}", Button(localize('openApprovals', "Open Approvals"), 'command:approvalsView.showApprovals')),
					media: {
						type: 'svg', altText: 'Interactive shortcuts.', path: '',
					}
				},
			]
		}
	},
	{
		id: 'notebooks',
		title: localize('gettingStarted.notebook.title', "Customize Notebooks"),
		description: '',
		icon: setupIcon,
		isFeatured: false,
		when: `config.${NotebookSetting.openGettingStarted} && userHasOpenedNotebook`,
		content: {
			type: 'steps',
			steps: [
				{
					completionEvents: ['onCommand:notebook.setProfile'],
					id: 'notebookProfile',
					title: localize('gettingStarted.notebookProfile.title', "Select the layout for your notebooks"),
					description: localize('gettingStarted.notebookProfile.description', "Get notebooks to feel just the way you prefer"),
					when: 'userHasOpenedNotebook',
					media: {
						type: 'markdown', path: 'notebookProfile'
					}
				},
			]
		}
	}
];
