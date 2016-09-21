package com.algonquincollege.hurdleg.loginexample;

import android.app.Activity;
import android.app.DialogFragment;
import android.os.Bundle;
import android.util.Log;
import android.util.Patterns;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends Activity {
    // CLASS VARIABLES (by convention, class vars in upper-case)
    private static final String ABOUT_DIALOG_TAG;
    private static final String LOG_TAG;

    //TODO pro-tip: class vars (i.e. static vars) can be initialized within a static block initializer.
    static {
        ABOUT_DIALOG_TAG = "About Dialog";
        LOG_TAG = "LOGIN EXAMPLE";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Log.i( LOG_TAG, "ENTER onCreate()" );

        // Use the findViewById( resourceID ) method to reference a <View> in the layout.
        // Remember to use a Java cast.
        Button loginButton = (Button) findViewById( R.id.loginButton );

        // REGISTER (i.e. set) the event handler for the "Log In" button.
        // When the user taps the "Log In" button, run the body of the onClick() method.
        //
        // API for Button: https://developer.android.com/reference/android/widget/Button.html
        // API for View.OnClickListener: https://developer.android.com/reference/android/view/View.html
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Log.i( LOG_TAG, "ENTER onClick()" );

                // Toast provides light-weight notifications to the user.
                Toast.makeText( getApplicationContext(), "Login Button :: onClick()", Toast.LENGTH_SHORT ).show();

                // Reference the userEmailText in the layout.
                EditText userEmailText = (EditText) findViewById( R.id.userEmailText );

                // GET the userEmail.
                String userEmail = userEmailText.getText().toString();

                // VALIDATE the userEmail
                // The user *must* enter some text.
                // Notice: the user may not enter a valid email address.
                // For example, "a" will be accepted.
                if ( userEmail.isEmpty() ) {
                    userEmailText.setError( "Enter Your Algonquin Email Address" );
                    userEmailText.requestFocus();
                    return;
                }

                // VALIDATE the userEmail
                // Use a regular expression (regex) to validate email address.
                if ( Patterns.EMAIL_ADDRESS.matcher(userEmailText.getText()).matches() == false ) {
                    userEmailText.setError( "Enter a Valid Email Address" );
                    userEmailText.requestFocus();
                    return;
                }

                // VALIDATE the userEmail
                // First position must be a lowercase letter [a-z]
                if ( Character.isLowerCase(userEmail.charAt(0)) == false ) {
                    userEmailText.setError( "The first position must be a letter [a-z]" );
                    userEmailText.requestFocus();
                    return;
                }

                // Reference the userPasswordText in the layout.
                EditText userPasswordText = (EditText) findViewById( R.id.userPasswordText );

                // VALIDATE the userPassword
                // The user can only enter a whole number.
                int password;
                try {
                    password = Integer.parseInt( userPasswordText.getText().toString() );
                } catch( NumberFormatException e ) {
                    userPasswordText.setError( "Your Password Must be a Number." );
                    userPasswordText.requestFocus();
                    return;
                }

                // GET whether or not the user wants to be remembered.
                // This UI <View> is optional for the user; no input validation is required.
                // Pro-tip: notice how I reference the CheckBox <View> AND get its value in one line.
                boolean isRememberMe = ( (CheckBox) findViewById(R.id.isRememberMe) ).isChecked();

                // SUCCESS!! All user input has been validated.
                Toast.makeText( getApplicationContext(), "Email: " + userEmail + " pw: " + password + " remember? " + isRememberMe, Toast.LENGTH_LONG ).show();

                Log.i( LOG_TAG, "LEAVE onClick()");
            }
        });
        Log.i( LOG_TAG, "LEAVE onCreate()" );
    }


    // TODO: add this method to create the options menu
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    // TODO: add this method to handle when the user selects a menu item
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        if (id == R.id.action_about) {
            DialogFragment newFragment = new AboutDialogFragment();
            newFragment.show( getFragmentManager(), ABOUT_DIALOG_TAG );
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    // TODO ALL STUDENTS
    // Perform a code inspection.
    // Notice.... the onClick property of the "forgotMyPasswordButton" is set to: handleForgotPasswordButton
    // This is another way to handle events in Android.
    // To implement, the signature must be:
    // public void <name of method>( View v )
    //   * public access modifier
    //   * void return type
    //   * name of method must be identical to the onClick property
    //   * accepts 1 parameter of type View
    public void handleForgotPasswordButton( View v ) {
        Toast.makeText( getApplicationContext(), "Clicked: Forgot Password Button", Toast.LENGTH_LONG).show();
    }
}
