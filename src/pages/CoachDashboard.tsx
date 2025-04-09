
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Calendar, Dumbbell, MessageSquare, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const CoachDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("clients");
  const [isOpen, setIsOpen] = useState(false);

  // Mock data for demonstration
  const clients = [
    { id: 1, name: "Emma Wilson", goal: "Weight Loss", progress: 68, lastActive: "2 days ago", image: null },
    { id: 2, name: "Jacob Thomas", goal: "Muscle Gain", progress: 42, lastActive: "5 hours ago", image: null },
    { id: 3, name: "Sarah Miller", goal: "General Fitness", progress: 85, lastActive: "Just now", image: null },
  ];

  const programs = [
    { id: 1, name: "Beginner Weight Loss", clients: 8, workouts: 24, duration: "8 weeks" },
    { id: 2, name: "Intermediate Strength", clients: 6, workouts: 36, duration: "12 weeks" },
    { id: 3, name: "Advanced HIIT", clients: 4, workouts: 48, duration: "16 weeks" },
  ];

  const schedule = [
    { id: 1, client: "Emma Wilson", time: "9:00 AM - 10:00 AM", type: "1-on-1 Session" },
    { id: 2, client: "Group Class", time: "11:00 AM - 12:00 PM", type: "HIIT Training" },
    { id: 3, client: "Jacob Thomas", time: "2:00 PM - 3:00 PM", type: "Program Review" },
  ];

  const handleClientMessage = (clientId: number) => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to the client.`,
    });
  };

  const handleAddProgram = () => {
    toast({
      title: "Create New Program",
      description: "Program creation form would open here.",
    });
  };

  const handleBookSession = () => {
    toast({
      title: "Schedule Session",
      description: "Session booking form would open here.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Coach Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your clients and training programs</p>
          </div>

          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gympal-blue" />
                  <span className="text-2xl font-bold">{clients.length}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Training Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-gympal-blue" />
                  <span className="text-2xl font-bold">{programs.length}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Today's Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gympal-blue" />
                  <span className="text-2xl font-bold">{schedule.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="clients" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
              <TabsTrigger value="clients" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Clients</span>
              </TabsTrigger>
              <TabsTrigger value="programs" className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                <span>Programs</span>
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Schedule</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="clients" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Client Management</CardTitle>
                    <CardDescription>View and manage your current clients</CardDescription>
                  </div>
                  <Command className="w-[200px] rounded-lg border shadow-md">
                    <CommandInput placeholder="Search clients..." />
                    <CommandList>
                      <CommandEmpty>No clients found.</CommandEmpty>
                      <CommandGroup>
                        {clients.map(client => (
                          <CommandItem key={client.id} value={client.name}>
                            {client.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </CardHeader>
                <CardContent>
                  {clients.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No clients yet</p>
                  ) : (
                    <ul className="space-y-4">
                      {clients.map((client) => (
                        <li key={client.id} className="bg-white p-4 rounded-md border">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={client.image || undefined} />
                                <AvatarFallback>{client.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{client.name}</h4>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{client.goal}</Badge>
                                  <span className="text-xs text-gray-500">Last active {client.lastActive}</span>
                                </div>
                              </div>
                            </div>
                            <Button onClick={() => handleClientMessage(client.id)} size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                          </div>
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Program Progress</span>
                              <span>{client.progress}%</span>
                            </div>
                            <Progress value={client.progress} className="h-2" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="programs" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Training Programs</CardTitle>
                    <CardDescription>Create and modify training programs for your clients</CardDescription>
                  </div>
                  <Button onClick={handleAddProgram} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    New Program
                  </Button>
                </CardHeader>
                <CardContent>
                  {programs.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No programs yet</p>
                  ) : (
                    <ul className="space-y-4">
                      {programs.map((program) => (
                        <Collapsible key={program.id} open={program.id === isOpen} onOpenChange={() => setIsOpen(program.id === isOpen ? false : program.id)}>
                          <CollapsibleTrigger asChild>
                            <div className="bg-white p-4 rounded-md border cursor-pointer hover:bg-gray-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{program.name}</h4>
                                <div className="flex items-center gap-4">
                                  <span className="text-sm">{program.duration}</span>
                                  <Badge variant="outline">{program.clients} clients</Badge>
                                </div>
                              </div>
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="bg-gray-50 p-4 rounded-b-md border-x border-b mt-[-1px]">
                            <div className="flex gap-4 pb-2">
                              <div>
                                <p className="text-sm text-gray-500">Total Workouts</p>
                                <p className="font-medium">{program.workouts}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Duration</p>
                                <p className="font-medium">{program.duration}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Active Clients</p>
                                <p className="font-medium">{program.clients}</p>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" variant="outline">Edit Program</Button>
                              <Button size="sm" variant="outline">Assign Clients</Button>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Today's Schedule</CardTitle>
                    <CardDescription>Manage your coaching sessions and availability</CardDescription>
                  </div>
                  <Button onClick={handleBookSession} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Book Session
                  </Button>
                </CardHeader>
                <CardContent>
                  {schedule.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No sessions scheduled today</p>
                  ) : (
                    <ul className="space-y-4">
                      {schedule.map((session) => (
                        <li key={session.id} className="bg-white p-4 rounded-md border flex items-center justify-between">
                          <div>
                            <p className="font-medium">{session.time}</p>
                            <div className="flex items-center gap-2">
                              <span>{session.client}</span>
                              <Badge variant="outline">{session.type}</Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                            <Button size="sm" variant="outline">
                              Notes
                            </Button>
                          </div>
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

export default CoachDashboard;
