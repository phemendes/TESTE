// Full Job & Project Management App for Best Coat Renovation
// Built with React (TailwindCSS + shadcn/ui)

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function JobManager() {
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([
    { client: 'Smith Family', budget: 10000, spent: 7500 },
    { client: 'Jones Residence', budget: 8000, spent: 6200 },
    { client: 'Sunrise Apartments', budget: 15000, spent: 13500 }
  ]);
  const [schedule, setSchedule] = useState([]);
  const [progress, setProgress] = useState([]);
  const [newLead, setNewLead] = useState({ name: '', contact: '', suburb: '', source: '', type: '', notes: '' });
  const [newProject, setNewProject] = useState({ client: '', budget: 0, spent: 0, hours: 0, timeSpent: 0, notes: '' });
  const [newSchedule, setNewSchedule] = useState({ job: '', date: '', time: '', assignedTo: '' });
  const [newProgress, setNewProgress] = useState({ job: '', prep: false, paint: false, touchups: false, complete: false });

  const addLead = () => {
    if (newLead.name && newLead.contact) {
      setLeads([...leads, { ...newLead, status: 'New', id: Date.now() }]);
      setNewLead({ name: '', contact: '', suburb: '', source: '', type: '', notes: '' });
    }
  };

  const addProject = () => {
    if (newProject.client && newProject.budget) {
      setProjects([...projects, { ...newProject, id: Date.now() }]);
      setNewProject({ client: '', budget: 0, spent: 0, hours: 0, timeSpent: 0, notes: '' });
    }
  };

  const addSchedule = () => {
    if (newSchedule.job && newSchedule.date) {
      setSchedule([...schedule, { ...newSchedule, id: Date.now() }]);
      setNewSchedule({ job: '', date: '', time: '', assignedTo: '' });
    }
  };

  const addProgress = () => {
    if (newProgress.job) {
      setProgress([...progress, { ...newProgress, id: Date.now() }]);
      setNewProgress({ job: '', prep: false, paint: false, touchups: false, complete: false });
    }
  };

  const calculateProfit = (project) => project.budget - project.spent;
  const chartData = projects.map((p) => ({ name: p.client, profit: calculateProfit(p), spent: p.spent }));

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Best Coat Renovation - Project Management</h1>
      <Tabs defaultValue="leads">
        <TabsList className="mb-4 flex flex-wrap gap-2">
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="analytics">Profit & Loss</TabsTrigger>
        </TabsList>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card className="mb-4">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">Profit & Loss Overview</h2>
              {chartData.length === 0 ? (
                <p>No project data available for analytics.</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="profit" fill="#4ade80" name="Profit" />
                    <Bar dataKey="spent" fill="#f87171" name="Spent" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
