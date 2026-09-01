// tabsConfig.js

// Configuration is the source of truth.
// The Tabs component doesn't need to know what the actual tabs are.
export const tabsConfig = [
  {
    id: "profile",
    label: "Profile",
    content: (
      <div>
        <h2>Profile</h2>
        <p>This is the profile content.</p>
      </div>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    content: (
      <div>
        <h2>Settings</h2>
        <p>This is the settings content.</p>
      </div>
    ),
  },
  {
    id: "notifications",
    label: "Notifications",
    content: (
      <div>
        <h2>Notifications</h2>
        <p>This is the notifications content.</p>
      </div>
    ),
  },
  {
    id: "billing",
    label: "Billing",
    disabled: true, // Disabled tabs cannot be selected.
    content: (
      <div>
        <h2>Billing</h2>
        <p>This is the billing content.</p>
      </div>
    ),
  },
];
