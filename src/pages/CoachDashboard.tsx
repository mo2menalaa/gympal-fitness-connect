
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CoachDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Coach Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your clients and training programs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p>View and manage your current clients.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Training Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Create and modify training programs for your clients.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Manage your coaching sessions and availability.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CoachDashboard;
