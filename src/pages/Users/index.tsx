import React, { useEffect, useState } from "react";
import { Box, Card, Container, Typography, Button } from "@mui/material";
import {
  apiGetUsers,
  apiPostActivateUser,
  apiPostDeactivateeUser,
} from "services/userServices";
import { User } from "./types";

const Users = () => {
  const [usersList, setUsersList] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await apiGetUsers();
      setUsersList(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeactivateUser = async (userId: string) => {
    try {
      await apiPostDeactivateeUser(userId);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleActivateUser = async (userId: string) => {
    try {
      await apiPostActivateUser(userId);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography
        variant="h5"
        sx={{
          mb: 2,
        }}
      >
        Users
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
        }}
      >
        {usersList.length
          ? usersList.map((userDetails) => (
              <Card
                sx={{
                  boxShadow: 0.5,
                  p: 2,
                }}
                key={userDetails._id}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {userDetails.username}
                  </Typography>

                  {userDetails.role !== "ADMIN" && (
                    <Button
                      variant="text"
                      onClick={(e) => {
                        userDetails.isActive
                          ? handleDeactivateUser(userDetails._id)
                          : handleActivateUser(userDetails._id);
                      }}
                      sx={{
                        p: 0,
                      }}
                    >
                      {userDetails.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  )}
                </Box>
              </Card>
            ))
          : "No Users found"}
      </Box>
    </Container>
  );
};

export default Users;
