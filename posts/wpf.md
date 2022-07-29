---
title: Windows Presentation Foundation
metaDesc: WPF employs XAML, an XML-based language, to define and link various interface elements. WPF applications can be deployed as standalone desktop programs or hosted as an embedded object in a website. WPF aims to unify a number of common user interface elements, such as 2D/3D rendering, fixed and adaptive documents, typography, vector graphics, runtime animation, and pre-rendered media.
date: '2018-01-03'
socialImage: images/wpf.jpg
---

Windows Presentation Foundation (or WPF) is a graphical subsystem by Microsoft for rendering user interfaces in Windows-based applications. In my coding career I worked with this technology. This page provides a mini project that has a few comprehensive examples of what WPF is capable of. The last topic of this page talks about Model-View-ViewModel (MMVV), which is a software architectural patttern that decouples the user interface with the business logic. This page is not meant to be a tutorial but simply a refresher to those that have experiences with WPF and MVVM.

This project demostrates a few WPF features through a series of examples. The first example is on animation. Here I have two images, one is a normal picture of me and the another one is not so skinny picture of me. These two images are overlapped with each other using the Canvas tag. In WPF, every control can only have one child, thus containers like StackPanel, WrapPanel, and DockPanel are used to lay out the interface, howevever they are "stacked" relative to each other except for the canvas and grid containers. Only Grid and Canvas allow for overlapping. Here we use a trigger with a loaded event to begin an animation that changes the opacity of a target with the name "pic" (which in this case is the not skinny picture) from fully visible to invisible within two seconds. The "RepeatBehavior" is set to forever which means the animation loops infinitely. Furthermore, we have two more routed events for mouse in and out which pauses and resumes the storyboard, respectively.

```csharp
<Canvas>
    <Canvas.Triggers>
        <EventTrigger RoutedEvent="Canvas.Loaded">
            <BeginStoryboard x:Name="OpacityStoryboard">
                <Storyboard TargetName="pic2" TargetProperty="Opacity">
                    <DoubleAnimation From="1" To="0" Duration="0:0:2" AutoReverse="True" RepeatBehavior="Forever" />
                </Storyboard>
            </BeginStoryboard>
        </EventTrigger>

        <EventTrigger RoutedEvent="UIElement.MouseEnter">
            <PauseStoryboard BeginStoryboardName="OpacityStoryboard" />
        </EventTrigger>
        <EventTrigger RoutedEvent="UIElement.MouseLeave">
            <ResumeStoryboard BeginStoryboardName="OpacityStoryboard" />
        </EventTrigger>
    </Canvas.Triggers>

    <Image x:Name="pic1" Source="Images/Skinny.jpg" />
    <Image x:Name="pic2" Source="Images/NotSkinny.jpg" />
</Canvas>
```

In this demo, we observe some pretty amazing WPF styling. The first style targets the whole Window. It has a trigger that listens to the binding of the property "IsChecked" of the element by the name of "redColorCheckBox." If this value is true, then it sets the background to red. But what background? The background of the specific type, which in this case is the window. The second block of code is inside the Window.Resources which means any styling or defines in this block is applied to the whole window. The first style in here applies to every button, hence in the video clip on the left you see that the three buttons all look the same (height of 30px, height of 80px, font size of 12px, etc). Furthermore, once again we have a trigger and this one is "IsMouseOver", meaning whenever the mouse is over the control (button), the foreground turns red. Styles in WPF do not have to be defined under Resources, it can be defined straight within the scope of the individual control. If you look at the second textbox, you will see that I am manipulating the "Background" and "IsEnabled" properties. The background is binded to whatever value I type in the textbox. This is done through RelativeSource to myself and taking the text property. Similarly, I have a data trigger that compares to my typed text, if it is equal to the string "disabled" then it will set the "IsEnabled" property to false. As you can see, the possibilities of WPF styling is endless. The complete code snippet is below.

```csharp
<Window.Style>
	<Style TargetType="{x:Type Window}">
		<Style.Triggers>
			<DataTrigger Binding="{Binding ElementName=redColorCheckBox, Path=IsChecked}" Value="True">
				<Setter Property="Background" Value="Red" />
			</DataTrigger>
		</Style.Triggers>
	</Style>
</Window.Style>

<Window.Resources>
	<Style TargetType = "{x:Type Button}">
		<Setter Property = "Height" Value = "30" />
		<Setter Property = "Width" Value = "80" />
		<Setter Property = "Foreground" Value = "Blue" />
		<Setter Property = "FontSize" Value = "12" />
		<Setter Property = "Margin" Value = "10" />
		<Style.Triggers>
			<Trigger Property="IsMouseOver" Value="True">
				<Setter Property="Foreground" Value="red" />
			</Trigger>
		</Style.Triggers>
	</Style>

	<Style x:Key="practiceStyle" TargetType="{x:Type TextBox}" >
		<Style.Triggers>
			<MultiTrigger>
				<MultiTrigger.Conditions>
					<Condition Property="IsMouseOver" Value="True" />
					<Condition Property="IsKeyboardFocused"  Value="True" />
				</MultiTrigger.Conditions>
				<MultiTrigger.Setters>
					<Setter Property="Foreground" Value="red" />
					<Setter Property="FontWeight" Value="Bold" />
					<Setter Property="FontSize" Value="18" />
				</MultiTrigger.Setters>
			</MultiTrigger>
		</Style.Triggers>
	</Style>

	<SolidColorBrush x:Key="staticBrush" Color="Yellow" />
</Window.Resources>

<StackPanel HorizontalAlignment="Center">
	<Button Content = "Button1"/>
	<Button Content = "Button2"/>
	<Button Content = "Button3"/>

	<TextBox Width="150" Background="{StaticResource staticBrush}" Style="{StaticResource practiceStyle}" />

	<TextBox Width="100" Margin="10">
		<TextBox.Style>
			<Style TargetType="TextBox">
				<Style.Triggers>
					<DataTrigger Binding="{Binding RelativeSource={RelativeSource Self}, Path=Text}" Value="disabled">
						<Setter Property="IsEnabled" Value="False" />
					</DataTrigger>
				</Style.Triggers>

				<Setter Property="Background" Value="{Binding RelativeSource={RelativeSource Self}, Path=Text}" />
			</Style>
		</TextBox.Style>
	</TextBox>

	<CheckBox x:Name = "redColorCheckBox" Content = "Set red as foreground color" Margin = "10"/>
</StackPanel>
```

Data binding is what makes WPF so powerful. In this demo, we will see how to properly create a data template. The XAML is pretty straight forward, we have a listbox and a button. This button subscribes to a click event which we will discuss later. The listbox contains an ItemsSource that populates the collection as well as an Item Template. The StaticResource of this property points to a data template that "customizes" the appearance on how to display the data, which in this sense I assign it to have a grid inside a border and in this grid we get and set the name and age of a person. Note that the binding of "Name" and "Age" are actually properties of an instance of the datum (from the item source). As for the population of the items and the model itself, I handled them in the code behind. I have a class called Person that has name and age as attributes and publicly expose them so the data template can retrieve them. In the constructor I have a list of people and assign it to the item source of the listbox. Note that we can also use the .NET ObservableCollection which implements the INotifyCollectionChanged that works well with MVVM. When users change the name and age of each item, the properties automatically get updated because of the binding, and when they click on the button, there's a message box that shows the person's information.

```csharp
<Window.Resources>
	<DataTemplate x:Key ="template">
		<Border x:Name="bord3r" BorderBrush="Red" BorderThickness="1">
			<Grid>
				<Grid.RowDefinitions>
					<RowDefinition Height = "Auto" />
					<RowDefinition Height = "Auto" />
				</Grid.RowDefinitions>
				<Grid.ColumnDefinitions>
					<ColumnDefinition Width = "Auto" />
					<ColumnDefinition Width = "200" />
				</Grid.ColumnDefinitions>

				<Label Margin = "10" Content="Name"/>
				<TextBox Grid.Column = "1" Margin = "10" Text = "{Binding Name}" />
				<Label Margin = "10" Grid.Row = "1" Content="Age"/>
				<TextBox Grid.Column = "1" Grid.Row = "1" Margin = "10" Text = "{Binding Age}" />
			</Grid>
		</Border>

		<DataTemplate.Triggers>
			<DataTrigger Binding="{Binding Path=Name}" Value="Yvonne">
				<Setter TargetName="bord3r" Property="BorderBrush" Value="blue" />
			</DataTrigger>
		</DataTemplate.Triggers>
	</DataTemplate>
</Window.Resources>

<Grid>
	<Grid.RowDefinitions>
		<RowDefinition Height = "Auto" />
		<RowDefinition Height = "*" />
	</Grid.RowDefinitions>

	<ListBox x:Name="listbox" ItemsSource = "{Binding Source}" ItemTemplate="{StaticResource template}" />

	<Button Grid.Row = "1"  Content = "_Show..." Click = "Button_Click" Width = "80" HorizontalAlignment = "Left" Margin = "10"/>

</Grid>
```

```csharp
public partial class DataTemplateExample : Window
{
    public DataTemplateExample()
    {
        InitializeComponent();

        List people = new List();
        people.Add(new Person { Name = "Ethan", Age = 27 });
        people.Add(new Person { Name = "Yvonne", Age = 62 });
        people.Add(new Person { Name = "Thomas", Age = 12 });

        listbox.ItemsSource = people;
    }

    private void Button_Click(object sender, RoutedEventArgs e)
    {
        Person selectedPerson = (Person)listbox.SelectedValue;

        if (selectedPerson != null)
        {
            string message = string.Format("{0} is {1} years old", selectedPerson.Name, selectedPerson.Age);
            MessageBox.Show(message);
        }
    }
}

public class Person
{
    private string _Name;
    private double _Age;

    public string Name
    {
        get { return _Name; }
        set { _Name = value; }
    }

    public double Age
    {
        get { return _Age; }
        set { _Age = value; }
    }
}
```

This is an example of a very basic and classic MVVM pattern. The main idea of MVVM is that the Model should know nothing about the View and vice-versa. The Model is defined as any object that holds information. The View is the front end presentational layer. The "link" between the two is the ViewModel. The ViewModel should only know about the Model and not the View, and the View should only know about the ViewModel and not the Model.

This example is very simple, we have a listbox, data grid, and combo box that shares the same items source. There is a button that upon invoke will take a textbox string and adds to the collection. The core of MVVM lies in the implementation of the INotifyPropertyChanged interface. This interface allows any messages to be updated back to the View. Any property in the ViewModel that is bound to the View should implement this.

```csharp
public class ViewModelBase: INotifyPropertyChanged
{
    public event PropertyChangedEventHandler PropertyChanged;

    protected virtual void OnPropertyChanged(string propertyName)
    {
        PropertyChangedEventHandler handler = PropertyChanged;
        if (handler != null)
        {
            handler(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
```

The second main component is the implementation of the ICommand interface. This is to bind commands in the View such as button or any control event.

```csharp
public class DelegateCommand : ICommand
{
    private readonly Action _execute;
    private readonly Func _canExecute;

    public DelegateCommand(Action executeMethod)
        : this(executeMethod, null)
    {
    }

    public DelegateCommand(Action executeMethod, Func canExecuteMethod)
    {
        if (executeMethod == null)
            throw new ArgumentNullException("executeMethod");

        _execute = executeMethod;
        _canExecute = canExecuteMethod;
    }

    public void Execute(object parameter)
    {
        _execute();
    }

    public bool CanExecute(object parameter)
    {
        return _canExecute == null ? true : _canExecute();
    }

    public event EventHandler CanExecuteChanged
    {
        add { CommandManager.RequerySuggested += value; }
        remove { CommandManager.RequerySuggested -= value; }
    }
}
```

The model can be anything, here I choose to create a blueprint of a person that has a first name, last name, and age.

```csharp
public class Person : INotifyPropertyChanged
{
    private string _FirstName;
    private string _LastName;
    private int _Age;

    public string FirstName
    {
        get { return _FirstName; }
        set
        {
            if (_FirstName != value)
            {
                _FirstName = value;
                OnPropertyChanged("FirstName");
            }
        }
    }

    public string LastName
    {
        get { return _LastName;}
        set
        {
            if (_LastName != value)
            {
                _LastName = value;
                OnPropertyChanged("LastName");
            }
        }
    }

    public int Age
    {
        get { return _Age;}
        set
        {
            if (_Age != value)
            {
                _Age = value;
                OnPropertyChanged("Age");
            }
        }
    }

    public event PropertyChangedEventHandler PropertyChanged;

    protected virtual void OnPropertyChanged(string propertyName)
    {
        PropertyChangedEventHandler handler = PropertyChanged;
        if (handler != null)
        {
            handler(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
```

I daresay the ViewModel is the most complex part of the application. Afterall, it handles all the business logic and serves as the mediator between the Model and View. Here, we populate the collection in the constructor and listen to the change in selected person. Because the list box, data grid, and combo box all shared the same ObservableCollection and because we notify the same messages back to the view, all three get updated at the same time.

```csharp
public class MainWindowViewModel : ViewModelBase
{
    public DelegateCommand AddUserCommand { get; set; }
    public ObservableCollection People { get; set; }
    private Person _SelectedPerson;

    private string _SelectedItemString;
    public string TextProperty { get; set; }

    public MainWindowViewModel()
    {
        AddUserCommand = new DelegateCommand(OnAddUserCommand);

        People = new ObservableCollection
        {
            new Person { FirstName="Ethan", LastName="Uong", Age=32 },
            new Person { FirstName="Yvonne", LastName="Liu", Age=26 },
            new Person { FirstName="Happy", LastName="Doggy", Age=3 },
        };
    }

    public Person SelectedPerson
    {
        get { return _SelectedPerson; }
        set
        {
            if (_SelectedPerson != value && value != null)
            {
                _SelectedPerson = value;
                SelectedItemString = value.FirstName;
                OnPropertyChanged("SelectedPerson");
            }
        }
    }

    public string SelectedItemString
    {
        get { return _SelectedItemString; }
        set
        {
            if (_SelectedItemString != value)
            {
                _SelectedItemString = value;
                OnPropertyChanged("SelectedItemString");
            }
        }
    }

    private void OnAddUserCommand()
    {
        if (!string.IsNullOrEmpty(TextProperty))
        {
            People.Add(new Person {
                FirstName = TextProperty.ToString(),
                LastName = TextProperty.ToString(),
                Age = DateTime.Now.Second
            });
        }
    }
}
```

And finally we have the View. The last major concept is how exactlyl do we bind everything together? We have established that the View must know nothing about the Model, but how precisely does the View understand the ViewModel? This is done by setting the DataContext of the View to an instance of the ViewModel.

```csharp
<Grid Margin="20">
    <Grid.RowDefinitions>
        <RowDefinition Height="Auto"/>
        <RowDefinition Height="Auto"/>
    </Grid.RowDefinitions>

    <StackPanel Grid.Row="0">
        <StackPanel Orientation="Horizontal">
            <ListBox ItemsSource="{Binding People}" SelectedItem="{Binding SelectedPerson}"
                     DisplayMemberPath="FirstName" HorizontalAlignment="Left"/>
            <DataGrid ItemsSource="{Binding People}" SelectedItem="{Binding SelectedPerson}" CanUserAddRows="False"
                      HorizontalAlignment="Left" Margin="5,0,0,0"/>
            <ComboBox ItemsSource="{Binding People}" SelectedItem="{Binding SelectedPerson}"
                      DisplayMemberPath="FirstName" Margin="5,0,0,5" VerticalAlignment="Top"/>
        </StackPanel>

        <TextBlock FontWeight="Bold" Margin="5" Text="The selected person is ">
        <Run Text="{Binding SelectedItemString}"/></TextBlock>
        <Label Content="Type in a name and hit button to add to collection" />
    </StackPanel>

    <StackPanel Grid.Row="1" Width="150" HorizontalAlignment="Left">
        <TextBox Text="{Binding TextProperty}" Margin="5"/>
        <Button Content="Add person" Command="{Binding AddUserCommand}" Margin="5" />
    </StackPanel>
</Grid>
```
