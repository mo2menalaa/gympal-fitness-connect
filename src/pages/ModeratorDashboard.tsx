
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { MessageSquare, FileText, Headphones, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ModeratorDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("support");
  
  // Mock data for demonstration
  const supportTickets = [
    { id: 1, user: "Coach Emma", issue: "Unable to upload training videos", priority: "high", status: "open" },
    { id: 2, user: "User Jacob", issue: "Payment not processing correctly", priority: "medium", status: "open" },
    { id: 3, user: "Coach Michael", issue: "Profile not updating", priority: "low", status: "open" },
  ];
  
  const contentItems = [
    { id: 1, type: "Article", title: "10 Best Exercises for Weight Loss", author: "Coach Emma", status: "pending" },
    { id: 2, type: "Video", title: "Perfect Push-up Form", author: "Coach Michael", status: "pending" },
    { id: 3, type: "Workout Plan", title: "30-Day Strength Challenge", author: "Coach Sarah", status: "pending" },
  ];
  
  const coachIssues = [
    { id: 1, coach: "Emma Wilson", issue: "Calendar integration not working", priority: "high", status: "open" },
    { id: 2, coach: "Michael Brown", issue: "Client messaging feature error", priority: "medium", status: "open" },
    { id: 3, coach: "Sarah Davis", issue: "Problem with payment setup", priority: "low", status: "open" },
  ];

  const handleResolveTicket = (id: number) => {
    toast({
      title: "Ticket Resolved",
      description: `Support ticket #${id} has been marked as resolved.`,
    });
  };

  const handleApproveContent = (id: number) => {
    toast({
      title: "Content Approved",
      description: `Content item #${id} has been approved and published.`,
    });
  };

  const handleRejectContent = (id: number) => {
    toast({
      title: "Content Rejected",
      description: `Content item #${id} has been rejected.`,
    });
  };

  const handleAssistCoach = (id: number) => {
    toast({
      title: "Coach Assisted",
      description: `You've marked coach issue #${id} as being handled.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Moderator Dashboard</h1>
            <p className="text-gray-600 mt-2">Support coaches and manage platform content</p>
          </div>
          
          <Tabs defaultValue="support" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
              <TabsTrigger value="support" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Support Queue</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Content</span>
              </TabsTrigger>
              <TabsTrigger value="coaches" className="flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                <span>Coach Support</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="support" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Support Queue</CardTitle>
                  <CardDescription>Respond to support requests from coaches and users</CardDescription>
                </CardHeader>
                <CardContent>
                  {supportTickets.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No active support tickets</p>
                  ) : (
                    <ul className="space-y-4">
                      {supportTickets.map((ticket) => (
                        <li key={ticket.id} className="bg-white p-4 rounded-md border flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{ticket.user}</span>
                              <Badge variant={ticket.priority === 'high' ? 'destructive' : ticket.priority === 'medium' ? 'default' : 'outline'}>
                                {ticket.priority}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mt-1">{ticket.issue}</p>
                          </div>
                          <Button onClick={() => handleResolveTicket(ticket.id)} size="sm">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Resolve
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Moderation</CardTitle>
                  <CardDescription>Review and moderate platform content</CardDescription>
                </CardHeader>
                <CardContent>
                  {contentItems.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No content awaiting moderation</p>
                  ) : (
                    <ul className="space-y-4">
                      {contentItems.map((content) => (
                        <li key={content.id} className="bg-white p-4 rounded-md border">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="font-medium">{content.title}</span>
                              <Badge variant="outline" className="ml-2">{content.type}</Badge>
                            </div>
                            <span className="text-sm text-gray-500">By {content.author}</span>
                          </div>
                          <div className="flex items-center justify-end gap-2 mt-2">
                            <Button onClick={() => handleRejectContent(content.id)} variant="outline" size="sm">
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                            <Button onClick={() => handleApproveContent(content.id)} size="sm">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="coaches" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Coach Support</CardTitle>
                  <CardDescription>Assist coaches with technical issues and platform questions</CardDescription>
                </CardHeader>
                <CardContent>
                  {coachIssues.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No coach issues reported</p>
                  ) : (
                    <ul className="space-y-4">
                      {coachIssues.map((issue) => (
                        <li key={issue.id} className="bg-white p-4 rounded-md border flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{issue.coach}</span>
                              <Badge variant={issue.priority === 'high' ? 'destructive' : issue.priority === 'medium' ? 'default' : 'outline'}>
                                {issue.priority}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mt-1">{issue.issue}</p>
                          </div>
                          <Button onClick={() => handleAssistCoach(issue.id)} size="sm">
                            <Headphones className="h-4 w-4 mr-2" />
                            Assist
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ModeratorDashboard;
