
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import {
  Calendar,
  User,
  Dumbbell,
  Utensils,
  MessageSquare,
  BarChart as BarChartIcon,
  FileText,
  ChevronRight,
  Clock
} from 'lucide-react';

// Mock data for the dashboard
const progressData = [
  { name: 'Week 1', weight: 80, calories: 2100 },
  { name: 'Week 2', weight: 79.2, calories: 2050 },
  { name: 'Week 3', weight: 78.5, calories: 2000 },
  { name: 'Week 4', weight: 77.8, calories: 1900 },
  { name: 'Week 5', weight: 77, calories: 1950 },
  { name: 'Week 6', weight: 76.4, calories: 1900 },
  { name: 'Week 7', weight: 75.8, calories: 1850 },
  { name: 'Week 8', weight: 75.2, calories: 1800 },
];

const workoutCompletion = [
  { name: 'Mon', completed: 100 },
  { name: 'Tue', completed: 100 },
  { name: 'Wed', completed: 75 },
  { name: 'Thu', completed: 100 },
  { name: 'Fri', completed: 0 },
  { name: 'Sat', completed: 50 },
  { name: 'Sun', completed: 0 },
];

const upcomingWorkouts = [
  {
    id: 1,
    name: 'Lower Body Strength',
    time: 'Today, 5:30 PM',
    duration: '45 min',
    completed: false
  },
  {
    id: 2,
    name: 'Upper Body Push',
    time: 'Tomorrow, 6:00 PM',
    duration: '50 min',
    completed: false
  },
  {
    id: 3,
    name: 'Cardio & Core',
    time: 'Wed, 5:30 PM',
    duration: '30 min',
    completed: false
  }
];

const recentMeals = [
  {
    id: 1,
    name: 'Breakfast',
    description: 'Oatmeal with berries and honey',
    calories: 350,
    protein: 12,
    carbs: 65,
    fat: 6
  },
  {
    id: 2,
    name: 'Lunch',
    description: 'Grilled chicken salad with olive oil',
    calories: 420,
    protein: 35,
    carbs: 15,
    fat: 22
  },
  {
    id: 3,
    name: 'Pre-workout',
    description: 'Protein shake with banana',
    calories: 280,
    protein: 25,
    carbs: 30,
    fat: 5
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gympal-blue/10 py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Welcome, Alex</h1>
              <p className="text-gray-600">Your fitness journey is progressing well!</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center">
                <MessageSquare size={18} className="mr-2" />
                Message Coach
              </Button>
              <Button className="bg-gympal-blue hover:bg-gympal-blue/90">
                Log Today's Progress
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container-custom">
          <Tabs 
            defaultValue={activeTab} 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-2 shadow-sm">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <TabsTrigger value="overview" className="flex items-center">
                  <BarChartIcon size={18} className="mr-2" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="workouts" className="flex items-center">
                  <Dumbbell size={18} className="mr-2" />
                  <span>Workouts</span>
                </TabsTrigger>
                <TabsTrigger value="nutrition" className="flex items-center">
                  <Utensils size={18} className="mr-2" />
                  <span>Nutrition</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center">
                  <User size={18} className="mr-2" />
                  <span>Profile</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Overview Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Weekly Goal Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Weight Loss</span>
                          <span className="text-sm font-medium">65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Workouts Completed</span>
                          <span className="text-sm font-medium">80%</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Protein Target</span>
                          <span className="text-sm font-medium">90%</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Sleep Quality</span>
                          <span className="text-sm font-medium">70%</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Hydration</span>
                          <span className="text-sm font-medium">75%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1 md:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Progress Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={progressData}
                          margin={{
                            top: 5,
                            right: 10,
                            left: 0,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="weight"
                            name="Weight (kg)"
                            stroke="#0077B6"
                            activeDot={{ r: 8 }}
                          />
                          <Line 
                            yAxisId="right" 
                            type="monotone" 
                            dataKey="calories" 
                            name="Calories (kcal)" 
                            stroke="#38b000" 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Next Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Upcoming Workouts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingWorkouts.map((workout) => (
                        <div 
                          key={workout.id}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gympal-blue/10 flex items-center justify-center mr-3">
                              <Dumbbell size={18} className="text-gympal-blue" />
                            </div>
                            <div>
                              <h3 className="font-medium">{workout.name}</h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock size={14} className="mr-1" />
                                {workout.time} • {workout.duration}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Recent Meals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentMeals.map((meal) => (
                        <div 
                          key={meal.id}
                          className="p-3 bg-gray-50 rounded-md"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium">{meal.name}</h3>
                            <span className="text-sm font-medium text-gympal-blue">
                              {meal.calories} kcal
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{meal.description}</p>
                          <div className="flex items-center text-xs text-gray-500 space-x-3">
                            <span>Protein: {meal.protein}g</span>
                            <span>Carbs: {meal.carbs}g</span>
                            <span>Fat: {meal.fat}g</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Weekly Workout Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={workoutCompletion}
                          margin={{
                            top: 5,
                            right: 5,
                            left: 0,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Bar dataKey="completed" name="Completion %" fill="#0077B6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="workouts">
              {/* Workouts content would go here */}
              <div className="text-center py-8">
                <h2 className="text-xl font-medium mb-2">Workouts Content</h2>
                <p className="text-gray-600">This tab would display detailed workout plans and history.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="nutrition">
              {/* Nutrition content would go here */}
              <div className="text-center py-8">
                <h2 className="text-xl font-medium mb-2">Nutrition Content</h2>
                <p className="text-gray-600">This tab would display meal plans and nutrition tracking.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="profile">
              {/* Profile content would go here */}
              <div className="text-center py-8">
                <h2 className="text-xl font-medium mb-2">Profile Content</h2>
                <p className="text-gray-600">This tab would display user profile information and settings.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
