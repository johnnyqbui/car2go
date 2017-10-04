import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

export default function Menu() {
	return (
		<View>
			<View>
				<MaterialIcons name='close' size={30} color={'black'}/>
				<Image
					style={styles.logo}
					source={require('./img/logo.png')}
				/>
			</View>
			<View>
				<TouchableOpacity>
					<FontAwesome name='user' size={30} color={'black'}/>
					<Text>Login</Text>
				</TouchableOpacity>

				<TouchableOpacity> size={30} color={'black'}/>
					<Text>Register</Text>
					<FontAwesome name='user-plus'
				</TouchableOpacity>

				<TouchableOpacity>
					<MaterialIcons name='settings' size={30} color={'black'}/>
					<Text>Settings</Text>
				</TouchableOpacity>

				<TouchableOpacity>
					<Text>Help</Text>
				</TouchableOpacity>

				<TouchableOpacity>
					<Text>Legal Information</Text>
				</TouchableOpacity>

				<TouchableOpacity>
					<Text>Privacy Policy</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}