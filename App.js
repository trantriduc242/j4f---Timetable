import { 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator, 
  FlatList, 
  TextInput, 
  Button, 
  Switch, 
  Alert 
} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swipeable } from 'react-native-gesture-handler';

export default function App() {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [subject, setSubject] = useState('');
  const [location, setLocation] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = () => {
    axios.get('http://localhost:8000/timetable')
      .then(response => {
        setTimetable(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching timetable');
        setLoading(false);
      });
  };

  const handleAddClass = () => {
    axios.post('http://localhost:8000/timetable', {
      day,
      time,
      subject,
      location,
    })
      .then(response => {
        setTimetable(prev => [...prev, response.data]);
        setDay('');
        setTime('');
        setSubject('');
        setLocation('');
      })
      .catch(err => {
        console.error('Error adding class:', err);
      });
  };

  // Updated handleDeleteClass with confirmation popup
  const handleDeleteClass = (index) => {
    Alert.alert(
      "Delete Class",
      "Are you sure you want to delete this class?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            axios.delete(`http://localhost:8000/timetable/${index}`)
              .then(response => {
                const newTimetable = [...timetable];
                newTimetable.splice(index, 1);
                setTimetable(newTimetable);
                console.log('Deleted class:', response.data);
              })
              .catch(err => {
                console.error('Error deleting class:', err);
              });
          }
        }
      ]
    );
  };

  const themeStyles = darkMode ? darkStyles : lightStyles;

  if (loading) return <View style={themeStyles.container}><ActivityIndicator size="large" /></View>;
  if (error) return <View style={themeStyles.container}><Text>{error}</Text></View>;

  return (
    <View style={themeStyles.container}>
      <Text style={themeStyles.title}>📅 My Timetable</Text>

      {/* Dark Mode Toggle */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: darkMode ? '#fff' : '#333', marginRight: 10 }}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      {/* Form Inputs */}
      <TextInput
        style={themeStyles.input}
        placeholder="Day (e.g., Monday)"
        placeholderTextColor={darkMode ? '#aaa' : '#666'}
        value={day}
        onChangeText={setDay}
      />
      <TextInput
        style={themeStyles.input}
        placeholder="Time (e.g., 9:00 AM)"
        placeholderTextColor={darkMode ? '#aaa' : '#666'}
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={themeStyles.input}
        placeholder="Subject (e.g., Math)"
        placeholderTextColor={darkMode ? '#aaa' : '#666'}
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={themeStyles.input}
        placeholder="Location (e.g., Room 101)"
        placeholderTextColor={darkMode ? '#aaa' : '#666'}
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Add Class" onPress={handleAddClass} />

      {/* Timetable List */}
      <FlatList
        style={{ marginTop: 20, width: '100%' }}
        data={timetable}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Swipeable
            renderRightActions={() => (
              <View style={themeStyles.deleteBox}>
                <Text style={themeStyles.deleteText}>Delete</Text>
              </View>
            )}
            onSwipeableOpen={() => handleDeleteClass(index)}
          >
            <View style={themeStyles.item}>
              <Text style={{ color: darkMode ? '#fff' : '#333' }}>{item.day} - {item.time}</Text>
              <Text style={{ color: darkMode ? '#aaa' : '#666' }}>{item.subject} @ {item.location}</Text>
            </View>
          </Swipeable>
        )}
      />
    </View>
  );
}

// Light Theme
const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#333',
  },
  deleteBox: {
    backgroundColor: '#ff5252',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
    borderRadius: 8,
    marginVertical: 8,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

// Dark Theme
const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  item: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    backgroundColor: '#1e1e1e',
    padding: 10,
    marginVertical: 8,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
    color: '#fff',
  },
  deleteBox: {
    backgroundColor: '#ff5252',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
    borderRadius: 8,
    marginVertical: 8,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
