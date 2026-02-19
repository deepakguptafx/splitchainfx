import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockGroups, type Group } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { Plus, X, Users } from "lucide-react";

export default function Groups() {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const { toast } = useToast();

  const addMember = () => {
    if (address.trim() && !members.includes(address.trim())) {
      setMembers([...members, address.trim()]);
      setAddress("");
    }
  };

  const removeMember = (m: string) => setMembers(members.filter((x) => x !== m));

  const createGroup = () => {
    if (!name.trim() || members.length === 0) {
      toast({ title: "Error", description: "Please enter a group name and add at least one participant.", variant: "destructive" });
      return;
    }
    const newGroup: Group = {
      id: `g${Date.now()}`,
      name: name.trim(),
      members,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setGroups([newGroup, ...groups]);
    setName("");
    setMembers([]);
    toast({ title: "Group Created!", description: `"${newGroup.name}" has been created successfully.` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Groups</h1>
        <p className="text-muted-foreground text-sm mt-1">Create and manage your expense groups</p>
      </div>

      {/* Create Group */}
      <Card className="glass rounded-2xl border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Create New Group</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Group Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-secondary border-border"
          />
          <div className="flex gap-2">
            <Input
              placeholder="Wallet address (e.g. ALGO...)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addMember()}
              className="bg-secondary border-border"
            />
            <Button onClick={addMember} size="icon" className="gradient-red text-foreground border-0 shrink-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {members.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {members.map((m) => (
                <Badge key={m} variant="secondary" className="bg-secondary text-foreground px-3 py-1.5 gap-2">
                  {m}
                  <X className="w-3 h-3 cursor-pointer hover:text-primary" onClick={() => removeMember(m)} />
                </Badge>
              ))}
            </div>
          )}
          <Button onClick={createGroup} className="gradient-red text-foreground border-0 w-full h-11 font-semibold transition-transform hover:scale-[1.02]">
            Create Group
          </Button>
        </CardContent>
      </Card>

      {/* Existing Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((g) => (
          <Card key={g.id} className="glass rounded-2xl border-border/50 hover:border-primary/30 transition-all">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="w-10 h-10 rounded-lg gradient-red flex items-center justify-center">
                <Users className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">{g.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{g.members.length} members · Created {g.createdAt}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {g.members.map((m) => (
                  <Badge key={m} variant="outline" className="text-xs border-border text-muted-foreground">
                    {m}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
