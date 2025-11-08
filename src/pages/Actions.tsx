/**
 * Actions page - Grid of micro-actions with details modal
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLumenStore } from '@/lib/store';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Icon from '@/components/Icon';
import Badge from '@/components/ui/Badge';
import { staggerContainer, staggerItem } from '@/styles/animation';
import type { MicroAction } from '@/data/seed';

const Actions: React.FC = () => {
  const { actions, completeAction } = useLumenStore();
  const [selectedAction, setSelectedAction] = useState<MicroAction | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleComplete = () => {
    if (selectedAction) {
      completeAction(selectedAction.id);
      setSelectedAction(null);
      setCurrentStep(0);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="heading-handwritten mb-2">Micro-Actions</h1>
        <p className="text-muted-text mb-8">Small steps that create meaningful change</p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {actions.map((action) => (
            <motion.div key={action.id} variants={staggerItem}>
              <Card
                hoverable
                className="h-full cursor-pointer"
                onClick={() => setSelectedAction(action)}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <Icon name={action.icon as any} size={56} animated />
                  <div>
                    <h3 className="font-handwritten text-xl text-accent-teal mb-2">
                      {action.name}
                    </h3>
                    <p className="text-sm text-muted-text mb-3">{action.description}</p>
                    <div className="flex flex-wrap gap-2 justify-center mb-3">
                      {action.tags.map((tag) => (
                        <Badge key={tag} variant="default">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-accent-teal font-medium">
                      {action.duration} minutes
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Action detail modal */}
        <Modal
          isOpen={!!selectedAction}
          onClose={() => {
            setSelectedAction(null);
            setCurrentStep(0);
          }}
          title={selectedAction?.name}
          size="lg"
        >
          {selectedAction && (
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <Icon name={selectedAction.icon as any} size={80} animated active />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Expected Impact</h4>
                <p className="text-sm text-muted-text">{selectedAction.expectedUplift}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Steps</h4>
                <div className="space-y-2">
                  {selectedAction.instructions.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                        index === currentStep
                          ? 'bg-accent-teal/10 border border-accent-teal/30'
                          : 'bg-white/50 dark:bg-white-soft/5'
                      }`}
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-teal text-white flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {currentStep < selectedAction.instructions.length - 1 ? (
                  <Button fullWidth onClick={() => setCurrentStep(currentStep + 1)}>
                    Next Step
                  </Button>
                ) : (
                  <Button fullWidth onClick={handleComplete}>
                    Complete Action
                  </Button>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Actions;
