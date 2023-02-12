import React, { useState } from "react";

const SettingsForm = ({ onSettingsSubmit }) => {
  const [settings, setSettings] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSettingsSubmit(settings);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Time Limit:
        <input
          type="number"
          name="timeLimit"
          value={settings.timeLimit || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Points per Question:
        <input
          type="number"
          name="pointsPerQuestion"
          value={settings.pointsPerQuestion || ""}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save Settings</button>
    </form>
  );
};

export default SettingsForm;
