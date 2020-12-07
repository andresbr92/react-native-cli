// package com.secondtry; 

// import com.facebook.react.bridge.NativeModule;
// import com.facebook.react.bridge.ReactApplicationContext;
// import com.facebook.react.bridge.ReactContext;
// import com.facebook.react.bridge.ReactContextBaseJavaModule;
// import com.facebook.react.bridge.ReactMethod;
// import java.util.Map;
// import java.util.HashMap;

// //importaciones nativas de wifi
// import android.content.Context;
// import android.content.Intent;
// import android.net.Uri;
// import android.net.wifi.WifiConfiguration;
// import android.net.wifi.WifiManager;
// import android.os.Build;
// import android.provider.Settings;
// import android.util.Log;

// //import java.lang.reflect.Method;



// public class WifiModule extends ReactContextBaseJavaModule {
//     WifiModule(ReactApplicationContext context) {
//        super(context);
//    }

//    @Override
// public String getName() {
//    return "WifiModule";
// }

// //metodos del wifi, a cacharrear se ha dicho






//     @ReactMethod
//    public void showData(String ssid, String password){
        

//       System.out.println(ssid);


//    }





// }

package com.secondtry;

import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Handler;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import org.json.JSONException;
import org.json.JSONObject;

public class LocalOnlyHotspotModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private WifiManager wifiManager;
    private WifiManager.LocalOnlyHotspotReservation mReservation;
    public LocalOnlyHotspotModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        wifiManager = (WifiManager) reactContext.getApplicationContext().getSystemService(reactContext.WIFI_SERVICE);
    }

    @Override
    public String getName() {
        return "LocalOnlyHotspot";
    }

    //    @ReactMethod
//    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
//        // TODO: Implement some actually useful functionality
//        callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
//    }
    @ReactMethod
    public void start(final Callback onStart, final Callback onFailed){
        System.out.println("ESTOY AQUI");
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            wifiManager.startLocalOnlyHotspot(new WifiManager.LocalOnlyHotspotCallback(){
                @Override
                public void onStarted(WifiManager.LocalOnlyHotspotReservation reservation) {
                    super.onStarted(reservation);
                    mReservation = reservation;
                    onStart.invoke(config());
                }

                @Override
                public void onFailed(int reason) {
                    super.onFailed(reason);
                    onFailed.invoke(reason);
                }
            },new Handler());
        }
    }

    @ReactMethod
    public void stop(Callback onStop){
        if (mReservation != null){
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                mReservation.close();
                onStop.invoke("Stopped");
            }
        }
    }

    @ReactMethod
    public void getConfig(Callback callback){
        callback.invoke(config());
    }

    private WritableMap config(){
        WritableMap resultData = new WritableNativeMap();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && mReservation!=null) {
            resultData.putString("ssid",mReservation.getWifiConfiguration().SSID);
            resultData.putString("secret",mReservation.getWifiConfiguration().preSharedKey);
        }
        return resultData;
    }
}