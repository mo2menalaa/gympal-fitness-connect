
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ModeratorDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Moderator Dashboard</h1>
            <p className="text-gray-600 mt-2">Support coaches and manage platform content</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Support Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Respond to support requests from coaches and users.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Content Moderation</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Review and moderate platform content.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Coach Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Assist coaches with technical issues and platform questions.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ModeratorDashboard;
