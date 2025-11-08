/**
 * Memory/Journal page - Timeline of entries
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLumenStore } from '@/lib/store';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import { staggerContainer, staggerItem } from '@/styles/animation';

const Memory: React.FC = () => {
  const { journalEntries, addJournalEntry, togglePinEntry } = useLumenStore();
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({ content: '', mood: '' });

  const handleAddEntry = () => {
    if (!newEntry.content.trim()) return;

    addJournalEntry({
      date: new Date().toISOString().split('T')[0],
      content: newEntry.content,
      mood: newEntry.mood || 'reflective',
    });

    setNewEntry({ content: '', mood: '' });
    setIsAddingEntry(false);
  };

  const sortedEntries = [...journalEntries].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="heading-handwritten mb-2">Memory Garden</h1>
            <p className="text-muted-text">Your reflections and growth journey</p>
          </div>
          <Button onClick={() => setIsAddingEntry(true)}>New Entry</Button>
        </div>

        <motion.div
          className="space-y-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {sortedEntries.map((entry) => (
            <motion.div key={entry.id} variants={staggerItem}>
              <Card hoverable>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="info">{entry.mood}</Badge>
                      <span className="text-xs text-muted-text">{entry.date}</span>
                      {entry.pinned && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--accent-teal)">
                          <path d="M8 2 L10 6 L14 7 L11 10 L12 14 L8 12 L4 14 L5 10 L2 7 L6 6 Z" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-text-primary">{entry.content}</p>
                  </div>
                  <button
                    onClick={() => togglePinEntry(entry.id)}
                    className="p-2 hover:bg-accent-teal/10 rounded-lg transition-colors"
                    aria-label={entry.pinned ? 'Unpin entry' : 'Pin entry'}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M10 2 L10 10 M6 6 L14 6 L12 10 L8 10 Z" />
                    </svg>
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}

          {journalEntries.length === 0 && (
            <Card className="text-center py-12">
              <p className="text-muted-text mb-4">No entries yet. Start your reflection journey!</p>
              <Button onClick={() => setIsAddingEntry(true)}>Create First Entry</Button>
            </Card>
          )}
        </motion.div>

        {/* Add entry modal */}
        <Modal
          isOpen={isAddingEntry}
          onClose={() => setIsAddingEntry(false)}
          title="New Reflection"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">How are you feeling?</label>
              <input
                type="text"
                value={newEntry.mood}
                onChange={(e) => setNewEntry({ ...newEntry, mood: e.target.value })}
                placeholder="e.g., grateful, calm, energized"
                className="w-full px-4 py-2 rounded-lg card-paper focus:outline-none focus:ring-2 focus:ring-accent-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Your thoughts</label>
              <textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                placeholder="What's on your mind today?"
                rows={6}
                className="w-full px-4 py-2 rounded-lg card-paper focus:outline-none focus:ring-2 focus:ring-accent-teal resize-none scrollbar-custom"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsAddingEntry(false)} fullWidth>
                Cancel
              </Button>
              <Button onClick={handleAddEntry} fullWidth disabled={!newEntry.content.trim()}>
                Save Entry
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Memory;
