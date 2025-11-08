/**
 * Settings page - Theme toggle, accessibility, data management
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLumenStore } from '@/lib/store';
import { toggleTheme } from '@/lib/themeSwitch';
import { storage } from '@/lib/storage';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { staggerContainer, staggerItem } from '@/styles/animation';

const Settings: React.FC = () => {
  const { theme, setTheme, settings, updateSettings, demoMode, toggleDemoMode, clearData } =
    useLumenStore();

  const handleThemeToggle = () => {
    const newTheme = toggleTheme(theme);
    setTheme(newTheme);
  };

  const handleExportData = () => {
    const data = storage.export();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lumen-earth-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      clearData();
      alert('Data cleared successfully');
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-handwritten mb-2">Settings</h1>
        <p className="text-muted-text mb-8">Customize your Lumen Earth experience</p>

        <motion.div
          className="space-y-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Theme */}
          <motion.div variants={staggerItem}>
            <Card>
              <h3 className="font-handwritten text-accent-teal text-lg mb-4">Appearance</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-muted-text">
                    {theme === 'light' ? 'Paper-Warm (Light)' : 'Midnight (Dark)'}
                  </p>
                </div>
                <Button onClick={handleThemeToggle}>
                  {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Accessibility */}
          <motion.div variants={staggerItem}>
            <Card>
              <h3 className="font-handwritten text-accent-teal text-lg mb-4">Accessibility</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Reduced Motion</p>
                    <p className="text-sm text-muted-text">Minimize animations</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.reducedMotion}
                      onChange={(e) =>
                        updateSettings({ reducedMotion: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-teal rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-teal"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Font Size</p>
                    <p className="text-sm text-muted-text">Adjust text size</p>
                  </div>
                  <div className="flex gap-2">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <Button
                        key={size}
                        size="sm"
                        variant={settings.fontSize === size ? 'primary' : 'outline'}
                        onClick={() => updateSettings({ fontSize: size })}
                      >
                        {size[0].toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Low Graphics Mode</p>
                    <p className="text-sm text-muted-text">Disable 3D scenes and animations</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.lowGraphicsMode}
                      onChange={(e) =>
                        updateSettings({ lowGraphicsMode: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-teal rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-teal"></div>
                  </label>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Demo Mode */}
          <motion.div variants={staggerItem}>
            <Card>
              <h3 className="font-handwritten text-accent-teal text-lg mb-4">Demo Mode</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Demo Activity</p>
                  <p className="text-sm text-muted-text">
                    Simulate activity to see animations
                    {demoMode && (
                      <Badge variant="success" className="ml-2">
                        Active
                      </Badge>
                    )}
                  </p>
                </div>
                <Button onClick={toggleDemoMode} variant={demoMode ? 'outline' : 'primary'}>
                  {demoMode ? 'Disable' : 'Enable'}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Data Management */}
          <motion.div variants={staggerItem}>
            <Card>
              <h3 className="font-handwritten text-accent-teal text-lg mb-4">Data Management</h3>
              <div className="space-y-3">
                <Button variant="outline" onClick={handleExportData} fullWidth>
                  Export Data (JSON)
                </Button>
                <Button variant="outline" onClick={handleClearData} fullWidth>
                  Clear All Data
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* About */}
          <motion.div variants={staggerItem}>
            <Card glass>
              <h3 className="font-handwritten text-accent-teal text-lg mb-2">About Lumen Earth</h3>
              <p className="text-sm text-muted-text">
                Version 1.0.0 - A mindful companion for personal growth and ecological awareness.
                Built with React, TypeScript, and care.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
