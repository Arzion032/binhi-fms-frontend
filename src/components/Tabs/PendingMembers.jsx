import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const members = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    email: "juandelacruz@gmail.com",
    role: "Member",
    dob: "July 17, 1997",
    address: "Matthew St., Macamot, Bulacan",
    submitted: "March 12, 2025, 11:34 AM",
    doc: "nat_id_juandc.pdf",
    avatar: "https://via.placeholder.com/40"
  },
  // Add more members here
];

export default function MemberApproval() {
  const [selectedMember, setSelectedMember] = useState(members[0]);

  return (
    <div className="flex h-screen bg-green-50 p-4">
      {/* Sidebar */}
      <div className="w-1/3 pr-4">
        <h2 className="text-lg font-semibold mb-2">Pending Members <span className="text-sm">({members.length})</span></h2>
        <Input placeholder="Search Member" className="mb-4" />
        <ScrollArea className="h-[85vh] rounded-md border">
          {members.map((member) => (
            <div
              key={member.id}
              className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
                selectedMember.id === member.id ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedMember(member)}
            >
              <Avatar className="mr-3">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold leading-tight">{member.name}</div>
                <Badge className="text-xs mt-1">{member.role}</Badge>
                <div className="text-xs text-gray-500 mt-1">Apr 9, 2025, 11:34 AM</div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Member Detail */}
      <Card className="w-2/3">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <Avatar className="mr-4 w-16 h-16">
              <AvatarImage src={selectedMember.avatar} />
              <AvatarFallback>{selectedMember.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xl font-bold">{selectedMember.name}</div>
              <div className="text-sm text-gray-600">{selectedMember.email}</div>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-semibold">Applied as: </span>
              <Badge>{selectedMember.role}</Badge>
            </div>
            <div>
              <span className="font-semibold">Uploaded Document: </span>
              <span className="text-blue-600 underline cursor-pointer">{selectedMember.doc}</span>
            </div>
            <div>
              <span className="font-semibold">Date of Birth: </span>{selectedMember.dob}
            </div>
            <div>
              <span className="font-semibold">Address: </span>{selectedMember.address}
            </div>
            <div>
              <span className="font-semibold">Submitted on: </span>{selectedMember.submitted}
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button variant="destructive">Reject</Button>
            <Button className="bg-green-600 hover:bg-green-700">Approve</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
