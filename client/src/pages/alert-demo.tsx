import React, { useState, useId } from 'react';
import { Alert, AlertTitle, AlertDescription, createAlert } from '../components/ui/Alert';

const AlertDemo: React.FC = () => {
  const [alerts, setAlerts] = useState<any[]>([
    {
      id: 1,
      ...createAlert.success('Your loan application has been submitted successfully!', 'Success'),
      dismissible: true,
    },
    {
      id: 2,
      ...createAlert.error('Please check your credit score before applying.', 'Application Error'),
      dismissible: true,
    },
    {
      id: 3,
      ...createAlert.warning('Your session will expire in 5 minutes.', 'Session Warning'),
      dismissible: true,
    },
    {
      id: 4,
      ...createAlert.info('New loan products are now available for review.'),
      dismissible: true,
    },
  ]);

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const addAlert = (type: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      success: 'Operation completed successfully!',
      error: 'An error occurred while processing your request.',
      warning: 'Please review your information before proceeding.',
      info: 'Here\'s some helpful information for you.',
    };

    const newAlert = {
      id: Date.now() + alerts.length, // Use timestamp + length for unique ID
      ...createAlert[type](messages[type]),
      dismissible: true,
    };

    setAlerts([...alerts, newAlert]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Alert Component Demo
          </h1>
          <p className="text-lg text-gray-600">
            A comprehensive alert system with multiple variants, icons, and dismissible functionality.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => addAlert('success')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Add Success Alert
          </button>
          <button
            onClick={() => addAlert('error')}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Add Error Alert
          </button>
          <button
            onClick={() => addAlert('warning')}
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
          >
            Add Warning Alert
          </button>
          <button
            onClick={() => addAlert('info')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Info Alert
          </button>
        </div>

        {/* Dynamic Alerts */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dynamic Alerts</h2>
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              variant={alert.variant}
              title={alert.title}
              description={alert.description}
              dismissible={alert.dismissible}
              onDismiss={() => removeAlert(alert.id)}
            />
          ))}
          {alerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No alerts to display. Click the buttons above to add some!
            </div>
          )}
        </div>

        {/* Static Examples */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Static Examples</h2>
          
          {/* Success Alert */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Success Alert</h3>
            <Alert variant="success" title="Loan Approved!" description="Your personal loan of $10,000 has been approved and will be disbursed within 24 hours." />
          </div>

          {/* Error Alert */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Alert</h3>
            <Alert variant="destructive" title="Application Rejected" description="Your loan application was rejected due to insufficient credit history. Please contact our support team for assistance." />
          </div>

          {/* Warning Alert */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Warning Alert</h3>
            <Alert variant="warning" title="Document Required" description="Please upload your latest bank statement to complete your application." />
          </div>

          {/* Info Alert */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Info Alert</h3>
            <Alert variant="info" title="New Feature Available" description="You can now track your loan application status in real-time through our mobile app." />
          </div>

          {/* Custom Content Alert */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Custom Content Alert</h3>
            <Alert variant="info">
              <AlertTitle>Loan Calculator Updated</AlertTitle>
              <AlertDescription>
                Our loan calculator now includes additional features:
              </AlertDescription>
              <ul className="mt-2 ml-4 list-disc text-sm">
                <li>Real-time interest rate updates</li>
                <li>Comparison with multiple lenders</li>
                <li>Personalized recommendations</li>
              </ul>
              <div className="mt-3">
                <button className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded transition-colors">
                  Try Calculator
                </button>
              </div>
            </Alert>
          </div>

          {/* No Icon Alert */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Alert Without Icon</h3>
            <Alert variant="default" title="System Maintenance" description="Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST." icon={false} />
          </div>

          {/* Dismissible Alert */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Dismissible Alert</h3>
            <Alert 
              variant="warning" 
              title="Cookie Notice" 
              description="This website uses cookies to enhance your browsing experience." 
              dismissible 
              onDismiss={() => console.log('Alert dismissed')} 
            />
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Usage Examples</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900">Basic Usage:</h4>
              <pre className="mt-1 bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`<Alert variant="success" title="Success!" description="Operation completed." />`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">With Custom Content:</h4>
              <pre className="mt-1 bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`<Alert variant="info">
  <AlertTitle>Custom Title</AlertTitle>
  <AlertDescription>Custom description with additional content.</AlertDescription>
  <div>Custom JSX content here</div>
</Alert>`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Using Helper Functions:</h4>
              <pre className="mt-1 bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`const alertProps = createAlert.success('Success message', 'Optional Title');
<Alert {...alertProps} dismissible onDismiss={handleDismiss} />`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDemo;