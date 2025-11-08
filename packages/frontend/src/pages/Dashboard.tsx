/**
 * Dashboard/Trends page - Simple charts and insights
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLumenStore } from '@/lib/store';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { staggerContainer, staggerItem } from '@/styles/animation';
import { demoTrends } from '@/data/seed';

const Dashboard: React.FC = () => {
  const { growthLevel } = useLumenStore();

  const trends = demoTrends;
  const avgMood = (trends.reduce((acc, t) => acc + t.mood, 0) / trends.length).toFixed(1);
  const totalSteps = trends.reduce((acc, t) => acc + t.steps, 0);
  const avgActions = (trends.reduce((acc, t) => acc + t.actions, 0) / trends.length).toFixed(1);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="heading-handwritten mb-2">Insights & Trends</h1>
        <p className="text-muted-text mb-8">Track your growth over time</p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={staggerItem}>
            <Card>
              <h3 className="text-sm text-muted-text mb-2">Growth Level</h3>
              <p className="text-3xl font-handwritten text-accent-teal">{growthLevel}%</p>
            </Card>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Card>
              <h3 className="text-sm text-muted-text mb-2">Average Mood</h3>
              <p className="text-3xl font-handwritten text-accent-teal">{avgMood}/10</p>
            </Card>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Card>
              <h3 className="text-sm text-muted-text mb-2">Total Steps (14d)</h3>
              <p className="text-3xl font-handwritten text-accent-teal">
                {(totalSteps / 1000).toFixed(0)}k
              </p>
            </Card>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Card>
              <h3 className="text-sm text-muted-text mb-2">Avg Actions/Day</h3>
              <p className="text-3xl font-handwritten text-accent-teal">{avgActions}</p>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          {/* Mood chart */}
          <motion.div variants={staggerItem} className="mb-6">
            <Card>
              <h3 className="font-handwritten text-accent-teal text-lg mb-4">Mood Trend</h3>
              <div className="h-48 flex items-end gap-2">
                {trends.map((point, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-gradient-to-t from-accent-teal to-accent-teal/40 rounded-t-md transition-all hover:opacity-80"
                      style={{ height: `${(point.mood / 10) * 100}%` }}
                    />
                    <span className="text-xs text-muted-text">{point.date.slice(5)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Insights */}
          <motion.div variants={staggerItem}>
            <Card>
              <h3 className="font-handwritten text-accent-teal text-lg mb-4">Key Insights</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="success">Positive</Badge>
                  <p className="text-sm text-muted-text flex-1">
                    Your mood has been trending upward over the past 14 days!
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="info">Pattern</Badge>
                  <p className="text-sm text-muted-text flex-1">
                    Days with more micro-actions correlate with better mood scores.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="warning">Tip</Badge>
                  <p className="text-sm text-muted-text flex-1">
                    Try maintaining at least {Math.ceil(Number(avgActions))} actions per day for
                    optimal growth.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
